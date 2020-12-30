import React from "react";
import * as Style from "./Keys.style";

type TransformKey = {
  key: string;
  transform: string;
}

const platform = navigator && navigator.platform;
const platformTransform = platform === "MacIntel" ? "⌘" : "⊞";

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

export const Keys = ({ hotkeyValue, id, isEditing }) => {
  const renderValues = isEditing && hotkeyValue.length !== 0 ? [" "] : hotkeyValue;
  return (
    <Style.KeyContainer key={id}>
      {
        renderValues.map(val => {
          const [transformMatch] = keyLabelsToTransform.filter(({ key }) => key === val);
          const label = transformMatch ? transformMatch.transform : val
          return (
            <div key={val}>
              {label.toUpperCase()}
            </div>
            );
          }
        )
      }
    </Style.KeyContainer>
  )
};

