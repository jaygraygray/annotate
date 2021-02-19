import { IpcService } from "../../../shell/lib/IpcService";

const useChannel = async ({ channelName = "", params = [] }) => {
  if (!channelName || typeof channelName !== "string") {
    throw new Error("Invalid channel name")
  }
  
  const ipc = new IpcService();
  const request = { params }
  const response = await ipc.send<any>(channelName, request)
  return {
    response
  }
}

export { useChannel }