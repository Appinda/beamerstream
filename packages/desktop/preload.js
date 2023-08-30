window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  getDisplays: () =>
    new Promise((resolve) => {
      ipcRenderer.send("getDisplays");
      ipcRenderer.once("getDisplays", (event, screens) => {
        resolve(screens);
      });
    }),
});
