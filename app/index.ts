// app/index.js
const path = require('path');
const { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain } = require('electron');
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}


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

    // mainWindow.removeMenu();
    mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));


  mainWindow.setAlwaysOnTop(true, 'screen');

  return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

let tray

app.whenReady().then(() => {
const mainWindow =  createWindow();
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  const iconPath = path.join(__dirname,'./clock-solid.png')
  const iconPath2 = path.join(__dirname,'./clock-solid@2.png')
  tray = new Tray(nativeImage.createFromPath(iconPath))
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Please Stand?', icon: nativeImage.createFromPath(iconPath2) },
    { label: 'Separator',       type: 'separator'},
    { label: 'Open', click: () => mainWindow.show() },
    { label: 'Minimize', click: () => mainWindow.hide() },
    { label: 'Exit', click: () => app.exit(0) }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
  

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
