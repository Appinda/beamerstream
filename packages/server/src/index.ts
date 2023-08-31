import { ApolloServer } from "@apollo/server";
import SchemaBuilder from "./SchemaBuilder.js";
import { createServer, Server as HttpServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import ResourceLoader from "./resources/ResourceLoader.js";
import { GraphQLSchema } from "graphql";
// import getPort from "get-port";

// const schema = await import("./schema.js");

export default class Server {
  private _port: number | null = null;
  private app!: Express;
  private httpServer!: HttpServer;
  private apolloServer!: ApolloServer;
  private resources!: ResourceLoader;
  private schema!: GraphQLSchema;

  public get port() {
    return this._port;
  }

  constructor() {}

  async init() {
    this.resources = new ResourceLoader();
    await this.resources.init();

    this.app = express();
    this.httpServer = createServer(this.app);

    const wsServer = new WebSocketServer({
      server: this.httpServer,
      path: "/graphql"
    });

    this.schema = new SchemaBuilder(this.resources).build();

    let serverCleanup = useServer({ schema: this.schema }, wsServer);

    this.apolloServer = new ApolloServer({
      schema: this.schema,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer }),
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              }
            };
          }
        }
      ]
    });
  }

  async run() {
    await this.init();

    await this.apolloServer.start();

    this.app.get("/", (req, res) => {
      res.send("Beamerstream server running.");
    });

    this.app.use("/graphql", cors<cors.CorsRequest>(), bodyParser.json(), expressMiddleware(this.apolloServer));

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
