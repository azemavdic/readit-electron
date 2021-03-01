// Modules
const { app, BrowserWindow, ipcMain } = require("electron");
const windowStateKeeper = require("electron-window-state");
const readItem = require("./readItem");
const appMenu = require("./menu");
const updater = require("./updater");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Listen for new item request
ipcMain.on("new-item", (e, itemUrl) => {
  // Get new item and send back to renderer
  readItem(itemUrl, (item) => {
    e.sender.send("new-item-success", item);
  });
});

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  //Provjeri ima li update nakon 3s
  setTimeout(updater, 1500);

  // Win state keeper
  let state = windowStateKeeper({
    defaultWidth: 500,
    defaultHeight: 650,
  });

  mainWindow = new BrowserWindow({
    x: state.x,
    y: state.y,
    width: state.width,
    height: state.height,
    minWidth: 350,
    maxWidth: 650,
    minHeight: 300,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Create main app menu
  appMenu(mainWindow.webContents);

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("renderer/main.html");

  // Manage new window state
  state.manage(mainWindow);

  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Electron `app` is ready
app.on("ready", createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
