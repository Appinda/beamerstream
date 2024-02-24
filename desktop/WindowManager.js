const { app, BrowserWindow, screen, ipcMain } = require("electron");
const path = require("path");

const { DEVELOP, getHost } = require("./utils");

class WindowManager {
  initWithSplashscreen() {
    const win = new BrowserWindow({
      width: 400,
      height: 150,
      movable: false,
      alwaysOnTop: true,
      center: true,
      closable: false,
      frame: false,
      transparent: true,
      resizable: false,
      // focusable: false,
    });

    win.loadFile("splash.html");
    this.splashScreen = win;

    setTimeout(() => {
      this.createWindow();
    }, 1000);
  }

  createWindow() {
    let window = new BrowserWindow({
      width: 1280,
      height: 720,
      show: false,
      title: "Control",
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

    if (DEVELOP) {
      window.loadURL(getHost());
    } else {
      const filePath = path.resolve(app.getAppPath(), "../ui/index.html");
      window.loadFile(filePath);
    }

    window.maximize();

    window.on("ready-to-show", () => {
      this.splashScreen.destroy();
      window.show();
      this.openScreen("live");
    });

    window.on("close", () => {
      app.quit();
    });
  }

  async openScreen(name) {
    let screens = screen.getAllDisplays();
    let targetScreen = screens[screens.length - 1];

    let window = new BrowserWindow({
      x: targetScreen.bounds.x,
      y: targetScreen.bounds.y,
      show: false,
      title: "Screen " + name,
      alwaysOnTop: false,
      fullscreen: true,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
    });

    window.setMenu(null);

    if (DEVELOP) {
      window.loadURL(getHost() + "/output/" + name);
    } else {
      const filePath = path.resolve(app.getAppPath(), "../ui/index.html");
      await window.loadFile(filePath, { hash: "/output/live" });
    }

    window.on("ready-to-show", () => {
      window.show();
    });
  }
}

module.exports = WindowManager;
