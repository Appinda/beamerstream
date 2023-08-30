import { ApolloServer } from "@apollo/server";
import { schema } from "./schema.js";
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
// import getPort from "get-port";

// const schema = await import("./schema.js");

export default class Server {
  private _port: number | null = null;
  private app: Express;
  private httpServer: HttpServer;
  private apolloServer: ApolloServer;

  public get port() {
    return this._port;
  }

  constructor() {
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

    this.app.use(
      "/graphql",
      cors<cors.CorsRequest>(),
      bodyParser.json(),
      expressMiddleware(this.apolloServer)
    );

    this._port = 4000;

    this.httpServer.listen(this._port, () => {
      console.log(
        `Server is now running on http://localhost:${this._port}/graphql`
      );
    });
  }
}

// Main function only to be run if standalone
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = new Server();
  server.run();
}
