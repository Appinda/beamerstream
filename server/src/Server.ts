import { ApolloServer } from "@apollo/server";
import SchemaBuilder from "./SchemaBuilder.js";
import { createServer, Server as HttpServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import express, { Express } from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import ResourceLoader from "./resources/ResourceLoader.js";
import { GraphQLSchema } from "graphql";
import path from "path";
import { fileURLToPath } from "url";
// import getPort from "get-port";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Server {
  private _host: string;
  private _port: number;
  private app!: Express;
  private httpServer!: HttpServer;
  private apolloServer!: ApolloServer;
  private resources!: ResourceLoader;
  private schema!: GraphQLSchema;

  public get host() {
    return this._host;
  }
  public get port() {
    return this._port;
  }

  constructor(host: string = "localhost", port: number = 3000) {
    this._port = port;
    this._host = host;
  }

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

  async start() {
    await this.init();

    await this.apolloServer.start();

    // this.app.get("/", (req, res) => {
    //   res.send("Beamerstream server running.");
    // });
    console.log(path.join(__dirname, "../control/dist"));

    this.app.use("/graphql", cors<cors.CorsRequest>(), express.json(), expressMiddleware(this.apolloServer));
    this.app.use("/", express.static(path.join(__dirname, "../../control/dist")));

    const options = {
      host: this.host,
      port: this.port,
      exclusive: true
    };
    this.httpServer.listen(options, () => {
      console.log(`Server is now running on http://${this.host}:${this.port}/graphql`);
    });
  }

  async stop(): Promise<void> {
    await this.apolloServer.stop();
    return new Promise<void>((resolve) => {
      this.httpServer.close(() => resolve());
    });
  }
}
