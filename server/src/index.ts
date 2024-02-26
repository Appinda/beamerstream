import Server from "./Server.js";

process.title = "Server";

const server = new Server();
server.start();

export default Server;
