
import React from "react";
import Stage from "./components/Stage";
import Menu from "./components/Menu";
import { AppContainerProps } from "./AppContainer"
import { useAppState } from './AppProvider'

const Payload = () => <div>owo</div>

const App = ({
  onClick,
  menuOrigins = {},
  onSettingsClick,
  startDrawClick,
  drawState,
  items,
  activeItem,
  setActiveItem,
  setDrawState
}: AppContainerProps) => {
  const [_unused, setState] = useAppState();
  const { addItem } = setState;

  const handleOnClick = React.useCallback((e) => {
    addItem(null, 'drawn', Payload);
  }, []);

  return (
      <div style={{ height: "100vh", width: "100vw" }} onClick={onClick}>
        <button onClick={handleOnClick}>Add Shape</button>
        <button>Remove Shape</button>
        <div className="clickable">
          <Menu
            x={menuOrigins.x}
            y={menuOrigins.y}
            onClick={() => console.log("wat")}
            onSettingsClick={onSettingsClick}
            startDrawClick={startDrawClick}
          />
        </div>
        <div style={{ background: 'pink', position: 'relative' }}>
          <Stage
            drawState={drawState}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            setDrawState={setDrawState}
            items={items}
          />
        </div>
    </div> 
  )
}


export default App;