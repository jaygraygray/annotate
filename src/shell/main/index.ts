'use strict'

import { app, BrowserWindow, screen } from 'electron'

if (module.hot) {
  module.hot.accept();
}

const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

const windowOptions = {
  webPreferences: {
    nodeIntegration: true
  },
  transparent: true,
  frame: false,
  x: 0,
  y: 0,
}

function createMainWindow(width, height) {
  const options = {
    width,
    height,
    ...windowOptions
  }
  const window = new BrowserWindow(options);

  if (isDevelopment) {
    window.loadURL(`http://localhost:8080/`);
    // window.webContents.openDevTools();
  }

  window.on('closed', () => {
    mainWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  if (mainWindow === null) {
    mainWindow = createMainWindow(width, height)
    mainWindow.loadURL('')
  }
})

// how to support multiple windows?
// https://gist.github.com/StickyCube/ed79421bc53cba38f5b74b060d3f15fa

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  mainWindow = createMainWindow(width, height)

})