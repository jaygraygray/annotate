import * as React from "react";
import * as ReactDOM from "react-dom";
import HotkeyProvider from "./hotkeys/hotkeyContext";
import { GlobalStyle } from "./App.styles";
import { App } from "./AppContainer";
import { AppProvider } from "./AppProvider";



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