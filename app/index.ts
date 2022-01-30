// app/index.js
const path = require('path');
const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const isDev = process.env.IS_DEV === 'true';

function createWindow() {
  // Create the browser window.
  const { screen } = require('electron')
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize
  const mainWindow = new BrowserWindow({
    skipTaskbar: true,
      x: width-200,
      y: height-200,
    frame: false,
    width: 200,
    height: 200,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  // Open the DevTools.
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    // mainWindow.removeMenu();
    mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
  }

  return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

let tray

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  const icon = nativeImage.createFromPath('./src/assets/logo.svg')
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  
  tray.setContextMenu(contextMenu)

    tray.setTitle('This is my title')

    tray.on('double-click', function(e){
        const window = createWindow()
        window.show()
      });

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});