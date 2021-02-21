// @ts-nocheck
import { css } from "styled-components";

export const container = css`
border: 3px solid #BDD4E7;
font-family: Liberation;
z-index: 9999;
`;

export const center = css`
  background: #cfe7fa;
  &:not(:empty):hover {
    cursor: pointer;
  }
  > svg {
    position: relative;
    top: calc(50% - 15px);
    left: calc(50% - 15px);
  }
`;

export const slice = css`
  cursor: pointer;
  color: grey;
  background: radial-gradient(transparent ${({ centerRadius }) => `${centerRadius}, #fff ${centerRadius}`});
  ;
  &[filled=true] {
    color: black;
  }
  &:hover,
  &[active=true] {
    color: black;
    background: radial-gradient(transparent ${({ centerRadius }) => `${centerRadius}, #9198e5 ${centerRadius}`});
  }
  `