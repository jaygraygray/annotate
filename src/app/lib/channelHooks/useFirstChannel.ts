import { useChannel } from "./useChannel";

// This abstraction seems overkill with this small example
// but will may dividends down the line. Will never need to type
// channel name, so lower chance of typos
// also allows computations on params if necessary. send starting params on initializatoin
// of the hook, then calculate whatever else you need here, inside the hook itself

const useFirstChannel = async ({ params = [] }) => {
  const channelName = "firstChannel";
  const request = { channelName, params }

  return await useChannel(request)
}

export default useFirstChannel;