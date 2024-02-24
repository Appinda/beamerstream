const path = require("path");
const { app, BrowserWindow } = require("electron");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { DEVELOP } = require("./utils");
const WindowManager = require("./WindowManager");
const {
  spawn,
  fork,
  ChildProcessWithoutNullStreams,
} = require("child_process");

if (DEVELOP) {
  console.log("DEVELOP is enabled.");
}

/** @type {ChildProcessWithoutNullStreams} */
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

process.title = "Beamerstream";

app.whenReady().then(async () => {
  console.log("Resource path:", process.resourcesPath);
  try {
    const serverPath = DEVELOP
      ? path.resolve("../server/dist")
      : path.join(process.resourcesPath, "server");
    const serverEntry = path.join(serverPath, "indexs.cjs");
    console.log(serverPath, serverEntry);
    server = fork(
      "D:\\CodeProjects\\Git\\Appinda\\beamerstream\\server\\dist\\index.cjs",
      {
        stdio: "pipe",
        cwd: serverPath,
        detached: false,
      }
    );
    server.stdout.on("data", (data) => {
      console.log(`[SERVER] ${data}`);
    });

    server.stderr.on("data", (data) => {
      console.error(`[SERVER]: ${data}`);
    });

    console.log("Server started");
  } catch (e) {
    console.error(e);
  }

  if (!args.headless) {
    const manager = new WindowManager();
    manager.initWithSplashscreen();
    app.on("activate", () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) manager.createWindow();
    });
  }
});

app.on("will-quit", async (e) => {
  console.log("Shutting down server..");
  // await server.stop();
  await new Promise((resolve) => {
    const result = server.kill("SIGINT");
    console.log(result);

    server.once("exit", () => {
      console.log("Exited");
      resolve();
    });
  });

  console.log("Done");
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", async () => {
  if (process.platform !== "darwin") app.quit();
});
