import { useCallback, useEffect, useState } from "react";

const useHotKeys = (keyMap) => {
  const [isMenuTriggerOpen, setIsMenuTriggerOpen] = useState<boolean>(false);

  const handleKeyDown = useCallback((e) => {
    const { key } = e;
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
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return (() => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    })
  }, []);

  const launchMenuViaKeyboard = true; 
  return {
    isMenuTriggerOpen,
    launchMenuViaKeyboard,
  }
}

export default useHotKeys;