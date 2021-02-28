import { IpcMainEvent, BrowserWindow } from "electron";
import { IpcChannel, IpcRequest } from "../../types/IpcChannel";

function openDrawStage() {
  const windowOptions = {
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

  let win = new BrowserWindow(windowOptions);
  return win;
}

export class OpenWindowHandler implements IpcChannel {
  getName(): string {
    return "openWindow"
  }

  public stage;
  async handle(event: IpcMainEvent, request: IpcRequest): Promise<void> {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }
    // this.stage = openDrawStage();
    // this.stage.loadURL('http://localhost:8080/stage.html');
    // event.sender.send(request.responseChannel, payload);
  }

}

