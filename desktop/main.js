const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { exec } = require("child_process");

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL("http://localhost:5173"); // For development, ensure your React app runs on this port.
  mainWindow.on("closed", () => (mainWindow = null));
});

// Handle the Bash command
ipcMain.on("run-bash-command", (event, arg) => {
  const command = `bash imp.sh nps-2009-domexusers.E01 ot 63`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      event.reply("bash-response", { error: error.message });
      return;
    }
    if (stderr) {
      event.reply("bash-response", { error: stderr });
      return;
    }
    event.reply("bash-response", { output: stdout });
  });
});