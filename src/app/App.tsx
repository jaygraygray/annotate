import React from "react";
import Stage from "./components/Stage";
import Menu from "./components/Menu";
import { AppContainerProps } from './AppContainer'

const App = ({
  onClick,
  menuOrigins = {},
  onSettingsClick,
  menuItemClick,
  drawState,
  items,
  activeItem,
  setActiveItem,
  setDrawState
}: AppContainerProps) => {
  return (
      <div style={{ height: "100vh", width: "100vw" }} onClick={onClick}>
        <Menu
          x={menuOrigins.x}
          y={menuOrigins.y}
          onClick={() => console.log("wat")}
          onSettingsClick={onSettingsClick}
          menuItemClick={menuItemClick}
        />
        <Stage
          drawState={drawState}
          items={items}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          setDrawState={setDrawState}
        />
    </div> 
  )
}


export default App;