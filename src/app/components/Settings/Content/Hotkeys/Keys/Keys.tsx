import React from "react";
import * as Style from "./Keys.style";

type TransformKey = {
  key: string;
  transform: string;
}

const platform = navigator && navigator.platform;
const platformTransform = platform === "MacIntel" ? "⌘" : "⊞";
//@ts-ignore
const keyLabelsToTransform: TransformKey[] = [
  { key: "Shift", transform: "SH" },
  { key: "CapsLock", transform: "CAPS" },
  { key: "Enter", transform: "ENT" },
  { key: "ArrowUp", transform: "↑" },
  { key: "ArrowDown", transform: "↓" },
  { key: "ArrowLeft", transform: "←" },
  { key: "ArrowRight", transform: "→" },
  { key: "Control", transform: "CTRL" },
  { key: "Meta", transform: platformTransform }, // ruh roh
  { key: "ContextMenu", transform: "CTX" },
  { key: "Escape", transform: "ESC" },
  { key: "Backspace", transform: "BSP" },
  { key: "PageDown", transform: "PGD" },
  { key: "PageUp", transform: "PGU" },
  { key: "End", transform: "END" },
  { key: "Delete", transform: "DEL" },
  { key: "Home", transform: "HOM" },
  { key: "Help", transform: "HLP" },
];

export const Keys = ({ value }) => {
  return (
    <Style.KeyContainer>
      {
        value.map(val => {
          const [transformMatch] = keyLabelsToTransform.filter(({ key }) => key === val);
          const label = transformMatch ? transformMatch.transform : val

          console.log(">>transformMatch", transformMatch);

          console.log("label", label);
          return (<div key={val}>
            {label.toUpperCase()}
          </div>);
          }
        )
      }
    </Style.KeyContainer>
  )
};

