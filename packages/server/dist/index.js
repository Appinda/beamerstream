import { ApolloServer } from '@apollo/server';
import fs from 'node:fs';
import { PubSub } from 'graphql-subscriptions';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createRequire } from 'node:module';
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import { fileURLToPath } from 'url';

class ResourceLoader {
    initDataDirectory() { }
    async init() { }
    async getSongs() {
        return [];
    }
    async getSong(id) {
        return null;
    }
}

const require2 = createRequire(import.meta.url);
const typeDefs = fs
    .readFileSync(require2.resolve("./schema.graphql"))
    .toString("utf-8");
const pubsub = new PubSub();
const resourceLoader = new ResourceLoader();
let displays = null;
let applicationMode = "desktop";
let currentVerse = `There is strength within the sorrow
There is beauty in our tears
And You meet us in our mourning
With a love that casts out fear`;
const resolvers = {
    Query: {
        songs: () => resourceLoader.getSongs(),
        song: (_parent, args, _ctx, _info) => {
            return resourceLoader.getSong(args.id);
        },
        currentSong: () => null,
        currentVerse: () => currentVerse,
        applicationMode: () => applicationMode,
        displays: () => displays,
    },
    Mutation: {
        setCurrentVerse: (_, data) => {
            currentVerse = data.text;
            pubsub.publish("CURRENT_VERSE_CHANGED", {
                currentVerseChanged: currentVerse,
            });
            return currentVerse;
        },
    },
    Subscription: {
        hello: {
            // Example using an async generator
            subscribe: async function* () {
                for await (const word of ["Hello", "Bonjour", "Ciao"]) {
                    yield { hello: word };
                }
            },
        },
        currentVerseChanged: {
            // More on pubsub below
            subscribe: () => pubsub.asyncIterator(["CURRENT_VERSE_CHANGED"]),
        },
    },
};
const schema = makeExecutableSchema({ typeDefs: typeDefs, resolvers });

// import getPort from "get-port";
// const schema = await import("./schema.js");
class Server {
    get port() {
        return this._port;
    }
    constructor() {
        Object.defineProperty(this, "_port", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "app", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "httpServer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apolloServer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        console.log("Creating server..");
        this.app = express();
        this.httpServer = createServer(this.app);
        const wsServer = new WebSocketServer({
            server: this.httpServer,
            path: "/graphql",
        });
        let serverCleanup = useServer({ schema }, wsServer);
        this.apolloServer = new ApolloServer({
            schema,
            plugins: [
                ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer }),
                {
                    async serverWillStart() {
                        return {
                            async drainServer() {
                                await serverCleanup.dispose();
                            },
                        };
                    },
                },
            ],
        });
    }
    async run() {
        await this.apolloServer.start();
        this.app.get("/", (req, res) => {
            res.send("Beamerstream server running.");
        });
        this.app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(this.apolloServer));
        this._port = 4000;
        this.httpServer.listen(this._port, () => {
            console.log(`Server is now running on http://localhost:${this._port}/graphql`);
        });
    }
}
// Main function only to be run if standalone
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const server = new Server();
    server.run();
}

export { Server as default };
