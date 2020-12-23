import React from "react";
import { defaultHotkeys, CUSTOM, DEFAULT } from "../../../../hotkeys"

const customHotkeys = defaultHotkeys.filter(({ type }) => type === CUSTOM);
const defaults = defaultHotkeys.filter(({ type }) => type === DEFAULT) 

const Description = ({ children }) => <div>{children}</div>

const Triggers = ({ children }) => <div>{children}</div>

const HotkeyRow = ({ description, value, label }) => {
  const formattedTrigger = label;
  return (
    <>
      <Triggers>{formattedTrigger}</Triggers>
      <Description>{description}</Description>
    </>
  )
}


console.log(">>customHotkeys", customHotkeys);
console.log(">>defaults", defaults);
export const Hotkeys = () => (
  <div>
    <div>
      Custom <br />
      {customHotkeys.map(({ description, value, label }) =>
        <HotkeyRow
          description={description}
          value={value}
          label={label}
        />)}
    </div>
    <div>
      Default <br />
      {defaults.map(({ description, value, label }) =>
        <HotkeyRow
          description={description}
          value={value}
          label={label}
        />)}
    </div>
  </div>
);

