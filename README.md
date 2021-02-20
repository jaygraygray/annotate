## `IpcService`
> src/shell/lib/IpcService.ts

Abstraction for sending requests through `ipcRenderer`. Instantiated in `src/app/lib/channelHooks/useChannel.ts`.

## `useChannel({ channelName: string, params?: string[] })`

Returns result of `ipc.send()`. Is core dependency for all other `useChannel*` hooks.

## `useChannel({ channelName: string, params?: string[] })`
> src/app/lib/channelHooks/**

Accepts input from the client app via `params`, and executes request ipc request by invoking `useChannel`

## `channelHandlers`
> src/shell/lib/channelHandlers/**

Contains OS or terminal-level business logic. Accepts parameters from `useChannel`, 

`channelName` value is required, params are optional.