import React, { useEffect, useRef, useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import Stage from "./components/Stage";
import Menu from "./components/Menu";
import Settings from "./components/Settings";
import findIndex from "lodash.findindex";

type DrawState = "placing" | "drawing" | "saved" | "init";

export type Item = {
  id: string;
  payload: any;
}

const shapeInit = [
  { id: "0", payload: "" }
]

export const App = (props) => {
  const [drawState, setDrawState] = useState<DrawState>("init"); 
  const bodyRef = useRef()
  const [shapes, setShapes] = useState<Item[]>(shapeInit);
  const [activeItem, setActiveItem] = useState<Item | null>(null);
  const [menuOrigins, setMenuOrigins] = useState({ x: 0, y: 0});

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "`") {
        setDrawState("placing")
      }
    })
  }, [setDrawState])

  useEffect(() => {
    window.addEventListener("contextmenu", removeShape)
    return (() => {
      window.removeEventListener("contextmenu", removeShape);
    })
  })

  // create shape logic needs to be extracted and passed
  // to Menu 
  const onClick = useCallback((e) => {
    const isMenuOpen = menuOrigins.x !== 0 && menuOrigins.y !== 0;
    setMenuOrigins({ x: 0, y: 0 });
    if (drawState === "init") {
      return;
    }
    if (drawState === "placing" && !isMenuOpen) {
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
      setMenuOrigins({ x: clientX, y: clientY })
    }

  }, [shapes])

  const [areSettingsOpen, setAreSettingsOpen] = useState(false);
  const onSettingsClick = useCallback(() => {
    setMenuOrigins({ x: 0, y: 0 });
    setAreSettingsOpen(!areSettingsOpen);
  }, [areSettingsOpen])

  if (areSettingsOpen) {
    return <Settings toggleOpenState={onSettingsClick} />
  }

  return (
    <div style={{ height: "100vh", width: "100vw" }} onClick={onClick} ref={bodyRef}>
      <Menu
        x={menuOrigins.x}
        y={menuOrigins.y}
        onClick={onClick}
        onSettingsClick={onSettingsClick}
      />
      <Stage
        drawState={drawState}
        items={shapes}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        setDrawState={setDrawState}
      />
    </div>  
  );
}
