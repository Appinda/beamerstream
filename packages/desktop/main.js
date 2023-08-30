const { app, BrowserWindow, screen, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  let window = new BrowserWindow({
    width: 1280,
    height: 720,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  ipcMain.on("getDisplays", (event, title) => {
    let screens = screen.getAllDisplays();
    event.reply("getDisplays", screens);
  });

  window.loadURL("http://localhost:5173/");

  window.maximize();

  window.on("ready-to-show", () => {
    window.show();
    openScreen("live");
  });

  window.on("close", () => {
    app.quit();
  });

  mainWindow = window;
  // mainWindow.webContents.openDevTools()
}

function openScreen(name) {
  let screens = screen.getAllDisplays();
  let targetScreen = screens[screens.length - 1];

  let window = new BrowserWindow({
    x: targetScreen.bounds.x,
    y: targetScreen.bounds.y,
    show: false,
    alwaysOnTop: false,
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  window.setMenu(null);

  window.loadURL("http://localhost:5173/output/" + name);

  window.on("ready-to-show", () => {
    window.show();
  });
}

app.whenReady().then(async () => {
  const Server = (await import("@beamerstream/server")).default;

  const server = new Server();
  server.run();

  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
