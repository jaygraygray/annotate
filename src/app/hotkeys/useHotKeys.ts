import { useCallback, useEffect, useState } from "react";

const useHotKeys = (keyMap) => {
  const [isKeyPressed, setIsKeyPressed] = useState<boolean>(false);
  const isMenuTriggerOpen = false;

  const handleKeyDown = useCallback(() => {
    setIsKeyPressed(true)
  }, []);

  const handleKeyUp = useCallback(() => {
    setIsKeyPressed(false);
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return (() => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    })
  }, []);

  return {
    isKeyPressed,
    isMenuTriggerOpen,
  }
}

export default useHotKeys;