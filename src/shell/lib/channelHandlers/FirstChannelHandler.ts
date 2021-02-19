import { IpcMainEvent } from "electron";
import { execSync } from "child_process";
import { IpcChannel, IpcRequest } from "../../types/IpcChannel";

export class FirstChannelHandler implements IpcChannel {
  // TODO: Create ChannelName type that
  // contains all valid names
  getName(): string {
    return "firstChannel"
  }

  handle(event: IpcMainEvent, request: IpcRequest): void {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }
    event.sender.send(request.responseChannel, { kernal: execSync('git --version').toString() })
  }
}