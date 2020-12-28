import { useCallback, useEffect, useState } from "react";

// TODO: add support for combo hotkeys, i.e.
// SHIFT+KEY+KEY
const useHotKeys = (keyMap) => {
  const [isMenuTriggerOpen, setIsMenuTriggerOpen] = useState<boolean>(false);

  // Add new case in each method for
  // each hotkey supported
  const handleKeyDown = useCallback((e) => {
    const { key } = e;
    console.log("key: ", key);
    switch(key) {
      case keyMap.menuTrigger:
        setIsMenuTriggerOpen(true);
    }
  }, [keyMap]);

  const handleKeyUp = useCallback((e) => {
    const { key } = e;
    switch(key) {
      case keyMap.menuTrigger:
        setIsMenuTriggerOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return (() => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    })
  }, []);

  return {
    isMenuTriggerOpen,
  }
}

export default useHotKeys;