import React, { useCallback } from "react";
import { Row } from "./Row";
import { defaultHotkeys, CUSTOM, DEFAULT } from "../../../../hotkeys"
import * as Style from "./Hotkeys.style";

const customHotkeys = defaultHotkeys.filter(({ type }) => type === CUSTOM);
const defaults = defaultHotkeys.filter(({ type }) => type === DEFAULT) 


export const Hotkeys = () => { 
  const edit = useCallback(() => {
    console.log("yœœœœœœœœœ");
  }, []);
  return (
    <Style.Container>
      <Style.Section>
        <span>Custom</span>
        {customHotkeys.map(({ description, value, label }) =>
          <Row
            description={description}
            value={value}
            key={label}
            onEdit={edit}
          />)}
      </Style.Section>
      <Style.Section>
        <span>Default</span>
        {defaults.map(({ description, value, label }) =>
          <Row
            description={description}
            value={value}
            key={label}
          />)}
      </Style.Section>
    </Style.Container>
  );
}
