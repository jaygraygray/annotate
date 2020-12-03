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
    <Styles.Container>
      <Styles.Body>
        <Styles.Left>
          <Styles.Navigation>
            <Styles.NavItem>***</Styles.NavItem>
            <Styles.NavItem>Hotkeys</Styles.NavItem>
            <Styles.NavItem>Arrow</Styles.NavItem>
            <Styles.NavItem>Line</Styles.NavItem>
            <Styles.NavItem>Account</Styles.NavItem>
            <Styles.NavItem>Help</Styles.NavItem>
          </Styles.Navigation>
        </Styles.Left>

        <Styles.Right>
          &nbsp;
        </Styles.Right>
      </Styles.Body>
    </Styles.Container>
  )
}

export default Settings;