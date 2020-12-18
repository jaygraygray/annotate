// @ts-nocheck
import { createGlobalStyle } from "styled-components";
import JetBrainsBold from "../assets/fonts/JetBrainsBold.ttf";

export const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'JetBrains';
    src: url(${JetBrainsBold});
    font-style: normal;
  }

  html, body {
    font-family: JetBrains;
  }

`
