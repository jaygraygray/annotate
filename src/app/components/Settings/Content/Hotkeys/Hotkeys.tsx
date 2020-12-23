import React from "react";
import { defaultHotkeys, CUSTOM, DEFAULT } from "../../../../hotkeys"
import * as Style from "./Hotkeys.style";

const customHotkeys = defaultHotkeys.filter(({ type }) => type === CUSTOM);
const defaults = defaultHotkeys.filter(({ type }) => type === DEFAULT) 

const Description = ({ children }) => <div>{children}</div>

const Triggers = ({ children }) => <div>{children}</div>

type TransformKey = {
  key: string;
  transform: string;
}
console.log(process)
const keyLabelsToTransform: TransformKey[] = [
  { key: "Shift", transform: "SH" },
  { key: "CapsLock", transform: "CAPS" },
  { key: "Enter", transform: "ENT" },
  { key: "ArrowUp", transform: "↑" },
  { key: "ArrowDown", transform: "↓" },
  { key: "ArrowLeft", transform: "←" },
  { key: "ArrowRight", transform: "→" },
  { key: "Control", transform: "CTRL" },
  { key: "Meta", transform: "" }, // ruh roh
  { key: "ContextMenu", transform: "CTX" },
  { key: "Enter", transform: "ENT" },
  { key: "Backspace", transform: "BSP" },
  { key: "PageDown", transform: "PGD" },
  { key: "PageUp", transform: "PGU" },
  { key: "End", transform: "END" },
  { key: "Delete", transform: "DEL" },
  { key: "Home", transform: "HOM" },
  { key: "Help", transform: "HLP" },
];

const HotkeyRow = ({ description, value, label }) => {
  console.log("value:", keyLabelsToTransform);
  const formattedTrigger = label;
  // some values need to be modified: i.e. Escape -> esc
  // or Meta -> OS specific
  return (
    <>
      <Triggers>{formattedTrigger}</Triggers>
      <Description>{description}</Description>
    </>
  )
}

export const Hotkeys = () => (
  <Style.Container>
    <Style.Section>
      <span>Custom &uarr;&uarr;&uarr;</span>
      {customHotkeys.map(({ description, value, label }) =>
        <HotkeyRow
          description={description}
          value={value}
          label={value}
          key={label}
        />)}
    </Style.Section>
    <Style.Section>
      <span>Default ↑</span>
      {defaults.map(({ description, value, label }) =>
        <HotkeyRow
          description={description}
          value={value}
          label={value}
          key={label}
        />)}
    </Style.Section>
  </Style.Container>
);

