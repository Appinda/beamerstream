const { app, BrowserWindow } = require("electron");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { DEVELOP } = require("./utils");
const Server = require("./server");

const WindowManager = require("./WindowManager");

if (DEVELOP) {
  console.log("DEVELOP is enabled.");
}

let server;

const args = yargs(hideBin(process.argv))
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Run with verbose logging",
  })
  .option("headless", {
    alias: "h",
    type: "boolean",
    description: "Start server without UI",
    default: false,
  })
  .option("host", {
    type: "string",
    description: "Server host",
  })
  .option("server", {
    type: "boolean",
    description: "Server host",
    default: false,
  })
  .option("port", {
    type: "number",
    description: "Server port",
  })
  .option("trace-warnings", {
    type: "boolean",
    description: "Trace warnings",
    hidden: true,
  })
  .strict()
  .parse();

app.whenReady().then(async () => {
  // const Server = (await import("./server/index.js")).default;

  server = new Server(args.host, args.port);
  server.start();

  if (!args.headless) {
    const manager = new WindowManager();
    manager.createWindow();
    app.on("activate", () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) manager.createWindow();
    });
  }
});

app.on("will-quit", async (e) => {
  console.log("Shutting down server..");
  await server.stop();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", async () => {
  if (process.platform !== "darwin") app.quit();
});
