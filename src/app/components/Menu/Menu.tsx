// @ts-nocheck
import React, { useCallback, useState, useEffect } from "react";
import PieMenu, { Slice } from "react-pie-menu";
import { ThemeProvider, css } from "styled-components";
import useOpenPlatformWindow from "../../lib/channelHooks/useOpenPlatformWindow";
import { SettingsIcon } from "../../icons";
import * as styles from "./Menu.style";

const theme = {
  pieMenu: {
    container: styles.container,
    list: css``,
    item: css`
    `,
    center: styles.center,
  },
  slice: {
    container: styles.slice,
    contentContainer: css``,
    content: css``,
  }
}


const PieMenuThemed = (props) => (
  <ThemeProvider theme={theme}>
    <PieMenu {...props} />
  </ThemeProvider>
)

async function getOpenWindow() {

}

const Menu = ({
  x,
  y,
  onClick,
  onSettingsClick,
  startDrawClick
}) => { 

  function sayHello() { return () => {
    console.log("hmm what is happening ")
  } }

  const [windowState, setOpenWindowStatus] = useState(sayHello);

  async function openWindow() {
    let result;
    try {
      result = await useOpenPlatformWindow("openWindow");
    } catch (e) {
      console.log(">>BUSTED", e);
    }
    setOpenWindowStatus(result);
   }
    
  const handleClick = useCallback((e, type) => {
    openWindow();
    // startDrawClick(e, type)
  }, [setOpenWindowStatus])

  if (x !== 0 && y !== 0) {
    return (
      <PieMenuThemed
        radius="125px"
        centerRadius="30px"
        centerX={`${x + 4}px`}
        centerY={`${y}px`}
      >
        <Slice onSelect={(e) => handleClick(e, "line")}>
          Line
        </Slice>
        <Slice onSelect={onSettingsClick}>
          <SettingsIcon width={25} height={25} />
        </Slice>
        <Slice>&nbsp;</Slice>
        <Slice onSelect={startDrawClick}>
          Highlighter
        </Slice>
        <Slice onClick={onClick}>
          Star
        </Slice>
        

      </PieMenuThemed>
    );
  }
  return null;
}

export default Menu;