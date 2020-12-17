import * as React from "react";
import * as ReactDOM from "react-dom";
import { GlobalStyle } from "./App.styles";
import { App } from "./App";

const AppWithStyles = () => (
  <>
    <GlobalStyle />
    <App />
  </>
)
ReactDOM.render(
  <AppWithStyles />,
  document.getElementById("app")
);