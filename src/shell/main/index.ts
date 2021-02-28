"use strict"

import { app, BrowserWindow, ipcMain, screen } from "electron";
import { FirstChannelHandler } from "../lib/channelHandlers/FirstChannelHandler";
import { OpenWindowHandler } from "../lib/channelHandlers/OpenWindowHandler";

if (module.hot) {
  module.hot.accept();
}

const isDevelopment = process.env.NODE_ENV !== "production"

app.commandLine.appendSwitch('disable-gpu-compositing')

class Main {
  private mainWindow: BrowserWindow
  // global reference to mainWindow (necessary to prevent window from being garbage collected)

  //
  // TODO: extract callbacks to class methods
  //
  public init(ipcChannels: any) {
      // quit application when all windows are closed
    app.on("window-all-closed", () => {
      // on macOS it is common for applications to stay open until the user explicitly quits
      if (process.platform !== "darwin") {
        app.quit()
      }
    })

    app.on("activate", () => {
      // on macOS it is common to re-create a window even after all windows have been closed
      const { width, height } = screen.getPrimaryDisplay().workAreaSize
      if (this.mainWindow === null) {
        this.mainWindow = this.createMainWindow(width, height)
        this.mainWindow.loadURL("")
      }
    })
    
    // how to support multiple windows?
    // https://gist.github.com/StickyCube/ed79421bc53cba38f5b74b060d3f15fa
    
    // create main BrowserWindow when electron is ready
    app.on("ready", () => {
      const { width, height } = screen.getPrimaryDisplay().workAreaSize
      this.mainWindow = this.createMainWindow(width, height)
    })

    this.registerIpcChannels(ipcChannels);

  }
  
  private windowOptions = {
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    x: 0,
    y: 0,
  }
  
  private createMainWindow(width, height) {
    const options = {
      width,
      height,
      ...this.windowOptions
    }
    const window = new BrowserWindow(options);

  
    if (isDevelopment) {
      window.loadURL(`http://localhost:8080/`);
      window.webContents.openDevTools();
    }
  
    window.on("closed", () => {
      this.mainWindow = null
    })
  
    window.webContents.on("devtools-opened", () => {
      window.focus()
      setImmediate(() => {
        window.focus()
      })
    })
  
    return window
  }

  private registerIpcChannels(ipcChannels: any) {
    ipcChannels.forEach(channel => ipcMain.on(channel.getName(), (event, request) => channel.handle(event, request)))
  }
}

(new Main()).init([
  new FirstChannelHandler(),
  new OpenWindowHandler(),
])