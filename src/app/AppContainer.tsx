import React, { useEffect, useCallback, useState, SyntheticEvent } from "react";
import { v4 as uuid } from "uuid";
import AppComponent from "./App";
import Settings from "./components/Settings";
import { hotKeyMap, useHotKeys } from "./hotkeys";
import { trackMousePosition } from "./utils/mouse";
import findIndex from "lodash.findindex";

type DrawState = "placing" | "drawing" | "saved" | "init";

export type Item = {
  id: string;
  payload: any;
}

export const App = (props) => {
  const [drawState, setDrawState] = useState<DrawState>("init"); 
  const [shapes, setShapes] = useState<Item[]>([]);
  const [activeItem, setActiveItem] = useState<Item | null>(null);
  const [menuOrigins, setMenuOrigins] = useState({ x: 0, y: 0});
  const MousePosition = trackMousePosition();
  const [areSettingsOpen, setAreSettingsOpen] = useState(false);
  const { isMenuTriggerOpen } = useHotKeys(hotKeyMap)

  // move this to useHotKeys
  useEffect(() => {
    if (isMenuTriggerOpen) {
      setMenuOrigins({ x: MousePosition.x, y: MousePosition.y });
    }
    
    let count = null;
    window.addEventListener("keydown", (e) => {
      if (e.key === "`") {
        if (count === null) {
          count = 1;
        } else {
          count += 1;
          if (count > 25) {
            
            count = null;
          }
        }
      }
    })
  }, [MousePosition])

  useEffect(() => {
    window.addEventListener("contextmenu", removeShape)
    return (() => {
      window.removeEventListener("contextmenu", removeShape);
    })
  })

  const menuItemClick = useCallback((e) => {
    setDrawState("placing")
    const isMenuOpen = menuOrigins.x !== 0 && menuOrigins.y !== 0;
    if (!isMenuOpen) {
      const { screenY, screenX } = e;
      const payload = {
        originX: screenX,
        originY: screenY
      }
      const newItem = {
        id: uuid(),
        payload,
      }
      
      setActiveItem(newItem)
    }

  }, [menuOrigins, drawState]);

  const onClick = useCallback((e) => {
    setMenuOrigins({ x: 0, y: 0 });
    if (drawState === "init") {
      return;
    }

    if (drawState === "placing") {
      setDrawState("drawing")
    }

    if (drawState === "drawing") {
      let newShapes = [];
      const existingShape = shapes.filter(({ id }) => activeItem.id === id);
      if (existingShape.length) {
        const index = findIndex(shapes, ({ id }) => id === activeItem.id)
        newShapes = shapes;
        newShapes.splice(index, 1);
        newShapes.splice(index, 0, existingShape[0]);
      } else {
        newShapes = [
          activeItem,
          ...shapes
        ];
      }
      
      setShapes(newShapes)
      setActiveItem(null);
      setDrawState("saved")
    }

  }, [drawState, shapes, menuOrigins]);

  const removeShape = useCallback((e) => {
    e.preventDefault();
    const { path, clientX, clientY } = e;

    let newShapes = [];
    const [isOnShape] = path.filter(el => {
      if (el && el.id) {
        const matches = shapes.filter(({ id }) => id === el.id)
        if (matches.length) {
          newShapes = shapes.filter(({ id }) => id !== el.id)
          return true;
        }
      }
      return false;
    })
    
    if (isOnShape) {
      setShapes(newShapes);
    } else {
      if (isMenuTriggerOpen) {
        setMenuOrigins({ x: clientX, y: clientY })
      }
    }

  }, [shapes, isMenuTriggerOpen])

  const onSettingsClick = useCallback(() => {
    setMenuOrigins({ x: 0, y: 0 });
    setAreSettingsOpen(!areSettingsOpen);
  }, [areSettingsOpen])

  if (areSettingsOpen) {
      return <Settings toggleOpenState={onSettingsClick} />
  }

  return (
    <AppComponent
      onClick={onClick}
      menuOrigins={menuOrigins}
      onSettingsClick={onSettingsClick}
      menuItemClick={menuItemClick}
      drawState={drawState}
      shapes={shapes}
      activeItem={activeItem}
      setActiveItem={setActiveItem}
      setDrawState={setDrawState}
    />
  );
}

export type AppContainerProps = {
  onClick: (e: SyntheticEvent) => void,
  menuOrigins: any,
  onSettingsClick: () => void,
  menuItemClick: (e: SyntheticEvent) => void,
  drawState: any,
  shapes: any,
  activeItem: any;
  setActiveItem: (item: Item) => void,
  setDrawState: (state: DrawState) => void,
};