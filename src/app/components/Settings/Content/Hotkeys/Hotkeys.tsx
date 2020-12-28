import React, { useCallback, useContext } from "react";
import { Row } from "./Row";
import { defaultHotkeys, CUSTOM, DEFAULT, HotkeyContext } from "../../../../hotkeys"
import * as Style from "./Hotkeys.style";

const customHotkeys = defaultHotkeys.filter(({ type }) => type === CUSTOM);
const defaults = defaultHotkeys.filter(({ type }) => type === DEFAULT) 


export const Hotkeys = () => { 
  const edit = useCallback(() => {
    console.log("yœœœœœœœœœ");
  }, []);
  const wat = useContext(HotkeyContext);
  console.log(">>>wat", wat);
  return (
    <Style.Container>
      <Style.Section>
        <span>Custom</span>
        {customHotkeys.map(({ description, hotkeyValue, label }) =>
          <Row
            description={description}
            hotkeyValue={hotkeyValue}
            key={label}
            onEdit={edit}
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
