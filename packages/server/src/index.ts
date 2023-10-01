import Server from "./Server.js";
import { createRequire } from "module";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

let entryFile = process.argv?.[1];

if (entryFile === __filename) {
  console.log("I'm main");
  const server = new Server();
  server.run();
} else {
  console.log("I'm child");
}

export default Server;
