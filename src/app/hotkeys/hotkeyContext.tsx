import React, { createContext, useEffect, useState } from "react";
import { defaultHotkeys } from "./hotkeyDefaults";

export const HotkeyContext = createContext({});

const HotkeyProvider = ({ children }) => {
  const [hotkeys, setHotkeys] = useState(defaultHotkeys);

  // load custom hotkeys, otherwise use defaults
  useEffect(() => {
    const keys = window.localStorage.getItem("keys");
    if (keys) {
      setHotkeys(JSON.parse(keys));
    } else {
      setHotkeys(defaultHotkeys);
    }
  }, []);

  return (
    <HotkeyContext.Provider value={{ hotkeys }}>
      {children}
    </HotkeyContext.Provider>
  )
};

export default HotkeyProvider;