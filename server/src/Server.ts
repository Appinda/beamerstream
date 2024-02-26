import express, { Express } from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import ResourceLoader from "./resources/ResourceLoader.js";
import path from "path";
import { fileURLToPath } from "url";
import { appRouter, createContext, AppRouter } from "./trpc2.js";
import cors from "cors";
// import getPort from "get-port";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Server {
  private _host: string;
  private _port: number;
  private app!: Express;

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
    this.app = express();
  }

  async start() {
    await this.init();

    this.app.use(
      "/trpc",
      cors(),
      trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext: createContext
      })
    );

    this.app.use("/", express.static(path.join(__dirname, "../../control/dist")));

    const options = {
      host: this.host,
      port: this.port,
      exclusive: true
    };
    this.app.listen(options, () => {
      console.log(`Server is now running on http://${this.host}:${this.port}`);
    });
  }
}

export type { AppRouter };
