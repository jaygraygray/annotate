import React, { createContext } from "react";

export const HotkeyContext = createContext({});

const HotkeyProvider = ({ children }) => {
  const obj = {
    foo: "bar"
  }
  return (
    <HotkeyContext.Provider value={{ obj }}>
      {children}
    </HotkeyContext.Provider>
  )
};

export default HotkeyProvider;