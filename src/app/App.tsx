
import React from "react";
import Stage from "./components/Stage";
import Menu from "./components/Menu";
import { AppContainerProps } from "./AppContainer"
import { useAppState } from './AppProvider'

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
  const [_unused, setState] = useAppState();
  const { addItem } = setState;

  return (
      <div style={{ height: "100vh", width: "100vw" }} onClick={onClick}>
        <button onClick={addItem}>Add Shape</button>
        <button>Remove Shape</button>
        <Menu
          x={menuOrigins.x}
          y={menuOrigins.y}
          onClick={() => console.log("wat")}
          onSettingsClick={onSettingsClick}
          menuItemClick={menuItemClick}
        />
        <Stage
          drawState={drawState}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          setDrawState={setDrawState}
          items={items}
        />
    </div> 
  )
}


export default App;