import React, { useEffect, useCallback } from "react";
import { Navigation } from "./Navigation";

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
  console.log("wut we got:", process.env.appVersion);
  return (
    <Styles.Container>
      <Styles.Body>
        <Styles.Left>
          <Navigation />

          <Styles.AppInfo>
            <div>{process.env.appName} {process.env.appVersion}</div>
            <div>
              By using {process.env.appName}, you agree to the following <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>.
            </div>
          </Styles.AppInfo>
        </Styles.Left>

        <Styles.Right>
          &nbsp;
        </Styles.Right>
      </Styles.Body>
    </Styles.Container>
  )
}

export default Settings;