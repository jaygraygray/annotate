import { IpcMainEvent } from "electron";
import { execSync } from "child_process";
import { transformSvgToJsx } from "../../../app/utils/transformSvg";
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

    /**
     * ALL FUN LOGIC GOES HERE :D
     */

     console.log(">>>FirstChannelHandler", request);

    // secnd param here is the result 
    event.sender.send(request.responseChannel, "some thing man idk")
  }
}