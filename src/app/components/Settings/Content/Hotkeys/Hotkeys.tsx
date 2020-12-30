import React from "react";
import { Row } from "./Row";
import { defaultHotkeys, CUSTOM, DEFAULT } from "../../../../hotkeys"
import * as Style from "./Hotkeys.style";

const customHotkeys = defaultHotkeys.filter(({ type }) => type === CUSTOM);
const defaults = defaultHotkeys.filter(({ type }) => type === DEFAULT) 


export const Hotkeys = () => { 
  return (
    <Style.Container>
      <Style.Section>
        <span>Custom</span>
        {customHotkeys.map(({ description, hotkeyValue, label, name }) =>
          <Row
            description={description}
            hotkeyValue={hotkeyValue}
            hotkeyName={name}
            key={label}
          />)}
      </Style.Section>
      <Style.Section>
        <span>Default</span>
        {defaults.map(({ description, hotkeyValue, label }) =>
          <Row
            description={description}
            hotkeyValue={hotkeyValue}
            key={label}
          />)}
      </Style.Section>
    </Style.Container>
  );
}
