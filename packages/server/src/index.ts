import Server from "./Server.js";
import { createRequire } from "module";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

let entryFile = process.argv?.[1];

// Only start if started directly
if (entryFile === __filename) {
  const server = new Server();
  server.run();
}

export default Server;
