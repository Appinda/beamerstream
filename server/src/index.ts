import Server from "./Server.js";

process.title = "Server";

const server = new Server();
server.start();

process.on("SIGINT", () => {
  console.log("Hey Boss I just Received SIGINT.");
});
process.on("SIGTERM", () => {
  console.log("Hey Boss I just Received SIGTERM.");
});

export default Server;
