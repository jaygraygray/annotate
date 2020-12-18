import React, { useEffect, useCallback, useState } from "react";
import { Navigation } from "./Navigation";
import { AppInfo } from "./AppInfo";
import { Content } from "./Content";

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
  
  const [activeContentIndex, setActiveContentIndex] = useState<number>(1); // avoid 0; will cause UI defect

  const handleSetActiveContentIndex = useCallback((index) => {
    setActiveContentIndex(index)
  }, []);

  return (
    <Styles.Container>
      <Styles.Body>
        <Styles.Left>
          <Navigation
            activeIndex={activeContentIndex}
            setActiveIndex={handleSetActiveContentIndex}
          />
          <AppInfo />
        </Styles.Left>

        <Styles.Right>
          <Content
            activeIndex={activeContentIndex}
          />
        </Styles.Right>
      </Styles.Body>
    </Styles.Container>
  )
}

export default Settings;