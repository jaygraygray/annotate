import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
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

  const updateHotkey = useCallback((hotkeyName: string, hotkeyValue: string[]) => {
    const keys = hotkeys.filter(({ name }) => name === hotkeyName);
    // let [keytoUpdate] = hotkeys.find(({ name }) => name === hotkeyName);
    const newKeys = [
      ...keys,
      [hotkeyName]
    ];
    console.log("newKeys: ", newKeys);
  }, []);

  return (
    <HotkeyContext.Provider value={{
      hotkeys,
      updateHotkey,
    }}>
      {children}
    </HotkeyContext.Provider>
  )
};

export default HotkeyProvider;