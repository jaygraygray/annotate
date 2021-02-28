import { useChannel } from "./useChannel";


const useOpenPlatformWindow = async (name: string) => {
  const channelName = "openWindow";
  const request = { channelName, params: [name] };
  return await useChannel(request); 
}

export default useOpenPlatformWindow;
