import React from "react";
import { Keys } from "./Keys";
import { defaultHotkeys, CUSTOM, DEFAULT } from "../../../../hotkeys"
import * as Style from "./Hotkeys.style";

const customHotkeys = defaultHotkeys.filter(({ type }) => type === CUSTOM);
const defaults = defaultHotkeys.filter(({ type }) => type === DEFAULT) 

const Description = ({ children }) => <div>{children}</div>


const HotkeyRow = ({ description, value, label }) => {
  return (
    <>
      <Keys value={value} />
      <Description>{description}</Description>
    </>
  )
}

export const Hotkeys = () => (
  <Style.Container>
    <Style.Section>
      <span>Custom</span>
      {customHotkeys.map(({ description, value, label }) =>
        <HotkeyRow
          description={description}
          value={value}
          label={value}
          key={label}
        />)}
    </Style.Section>
    <Style.Section>
      <span>Default</span>
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

