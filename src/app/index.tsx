import * as React from "react";
import * as ReactDOM from "react-dom";
import HotkeyProvider from "./hotkeys/hotkeyContext";
import { GlobalStyle } from "./App.styles";
import { App } from "./AppContainer";

const AppWithStyles = () => (
  <>
    <GlobalStyle />
    <HotkeyProvider>
      <App />
    </HotkeyProvider>
  </>
)
ReactDOM.render(
  <AppWithStyles />,
  document.getElementById("app")
);