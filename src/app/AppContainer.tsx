// @ts-nocheck
import React, { useEffect, useCallback, useState, SyntheticEvent } from "react";
import { v4 as uuid } from "uuid";
import findIndex from "lodash.findindex";
import { DrawState, Item } from "../app/types"
import AppComponent from "./App";
import Settings from "./components/Settings";
import { hotKeyMap, useHotKeys } from "./hotkeys";
import { trackMousePosition } from "./utils/mouse";
import { useAppState } from "./AppProvider";

export const App = (props) => {
  // const [state, setState] = useAppState();
  // const { newItems } = state;
  const [items ,setItems] = useState<Item[]>([]);
  
  const [drawState, setDrawState] = useState<DrawState>("init"); 
  const [activeItem, setActiveItem] = useState<Item>(null);
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
      let newItems = [];
      const existingShape = items.filter(({ id }) => activeItem.id === id);
      if (existingShape.length) {
        const index = findIndex(items, ({ id }) => id === activeItem.id)
        newItems = items;
        newItems.splice(index, 1);
        newItems.splice(index, 0, existingShape[0]);
      } else {
        newItems = [
          activeItem,
          ...items
        ];
      }
      
      setItems(newItems)
      setActiveItem(null);
      setDrawState("saved")
    }

  }, [drawState, items, menuOrigins]);

  const removeShape = useCallback((e) => {
    e.preventDefault();
    const { path, clientX, clientY } = e;

    let newItems = [];
    const [isOnItem] = path.filter(el => {
      if (el && el.id) {
        const matches = items.filter(({ id }) => id === el.id)
        if (matches.length) {
          newItems = items.filter(({ id }) => id !== el.id)
          return true;
        }
      }
      return false;
    })
    
    if (isOnItem) {
      setItems(newItems);
    } else {
      if (isMenuTriggerOpen) {
        setMenuOrigins({ x: clientX, y: clientY })
      }
    }

  }, [items, isMenuTriggerOpen])

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
      items={items}
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
  items: any,
  activeItem: any;
  setActiveItem: (item: Item) => void,
  setDrawState: (state: DrawState) => void,
};