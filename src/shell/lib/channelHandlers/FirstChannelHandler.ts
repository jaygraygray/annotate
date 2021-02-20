import { IpcMainEvent } from "electron";
import svgr from "@svgr/core";
import { transformSvgToJsx } from "../../utils/transformSvg"
import { IpcChannel, IpcRequest } from "../../types/IpcChannel";

export class FirstChannelHandler implements IpcChannel {
  // TODO: Create ChannelName type that
  // contains all valid names
  getName(): string {
    return "firstChannel"
  }

  //  IpcRequest is generic, need to extend interface
  //  for each handler
  async handle(event: IpcMainEvent, request: IpcRequest): Promise<void> {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }

    /**
     * ALL FUN LOGIC GOES HERE :D
     */
    const rawSvg = request.params[0];
    const rawComponentText = await svgr(rawSvg);
    const draft1 = rawComponentText.replace('import * as React from "react";', "");
    const draft2 = draft1.replace('export default SvgComponent;', "");
    const finalDraft = draft2.replaceAll("\n", "");
    

    // need to interpret the string of JSX

    // second param here is the result 
    event.sender.send(request.responseChannel, finalDraft)
  }
}