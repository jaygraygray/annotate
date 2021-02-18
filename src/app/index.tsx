import * as React from "react";
import * as ReactDOM from "react-dom";
import HotkeyProvider from "./hotkeys/hotkeyContext";
import { GlobalStyle } from "./App.styles";
import { App } from "./AppContainer";
import { AppProvider } from "./AppProvider";

import { IpcService } from "../shell/lib/IpcService";
const ipc = new IpcService();

document.getElementById('test-click').addEventListener('click', async () => {
  const t = await ipc.send<{ kernel: string }>('firstChannel');
  document.getElementById('versionInfo').innerHTML = t.toString();
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