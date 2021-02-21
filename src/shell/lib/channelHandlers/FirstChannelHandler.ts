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


    // svgr creates an entire react component
    // we only need JSX body
    const rawSvg = request.params[0];
    const rawComponentText = await svgr(rawSvg);
    const payload = rawComponentText.trim()
      .replace('import * as React from "react";', "")
      .replace('export default SvgComponent;', "")
      .replace("function SvgComponent(props) {", "")
      .replace("return ", "")
      .replace("</svg>;\n}", "</svg>")
      .replaceAll(/\r?\n|\r/g, "")
      .trim()

    // second param here is the result 
    event.sender.send(request.responseChannel, payload)
  }
}