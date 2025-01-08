const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  runBashCommand: (command) => ipcRenderer.send("run-bash-command", command),
  onBashResponse: (callback) => ipcRenderer.on("bash-response", (event, arg) => callback(arg)),
});
