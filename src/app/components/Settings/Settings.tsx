import React, { useEffect, useCallback } from "react";
import * as Styles from "./Settings.style";

const Settings = ({
  toggleOpenState,
}) => {

  const contextClick = useCallback((e) => {
    e.preventDefault();
  }, []);

  const onKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      toggleOpenState();
    }
  }, [toggleOpenState])

  useEffect(() => {
    window.addEventListener("contextmenu", contextClick);
    window.addEventListener("keydown", onKeyDown);
    return (() => {
      window.removeEventListener("contextmenu", contextClick);
      window.removeEventListener("keydown", onKeyDown);
    })
  }, [])
  return (
    <Styles.Container>i am settings bich</Styles.Container>
  )
}

export default Settings;