// @ts-nocheck
import { createGlobalStyle } from "styled-components";
import JetBrainsBold from "../assets/fonts/JetBrainsBold.ttf";
import Liberation from "../assets/fonts/LiberationSans-Regular.ttf";
import LiberationBold from "../assets/fonts/LiberationSans-Bold.ttf";

export const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'JetBrains';
    src: url(${JetBrainsBold});
    font-style: normal;
  }

  @font-face {
    font-family: 'Liberation';
    src: url(${Liberation});
    font-style: normal;
  }

  @font-face {
    font-family: 'Liberation bold';
    src: url(${LiberationBold});
  }

`
