import * as React from "react";
import * as ReactDOM from "react-dom";
import HotkeyProvider from "./hotkeys/hotkeyContext";
import { GlobalStyle } from "./App.styles";
import { App } from "./AppContainer";
import { AppProvider } from "./AppProvider";
import useFirstChannel from "../app/lib/channelHooks/useFirstChannel";

type FirstChannel = {
  kernal: string
}

import { IpcService } from "../shell/lib/IpcService";
const ipc = new IpcService();

document.getElementById('test-click').addEventListener('click', async () => {
  const request = {
    params: ["qq"]
  }
  const response = await useFirstChannel(request);
  console.log("response", response);
  document.getElementById('versionInfo').innerHTML = response.toString();
});


const AppWithStyles = () => (
  <>
    <GlobalStyle />
    <HotkeyProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </HotkeyProvider>
  </>
)
ReactDOM.render(
  <AppWithStyles />,
  document.getElementById("app")
);