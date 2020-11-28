// @ts-nocheck
import React, { useEffect, useRef, useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import Arrow from "./icons/src/Arrow";
import Stage from "./components/Stage";
import Menu from "./components/Menu";
import findIndex from "lodash.findindex";

type DrawState = "placing" | "drawing" | "saved";

export type Item = {
  id: string;
  payload: any;
}

const shapeInit = [
  { id: "0", payload: "" }
]

export const App = (props) => {
  const [drawState, setDrawState] = useState<DrawState>("placing"); 
  const bodyRef = useRef()
  const [shapes, setShapes] = useState<Item[]>(shapeInit);
  const [activeItem, setActiveItem] = useState<Item>({});

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

  const onClick = useCallback((e) => {
    setMenuOrigins({ x: 0, y: 0 })
    if (drawState === "placing") {
      const { screenY, screenX } = e;
      const payload = {
        top: screenX,
        left: screenY
      }
      const newItem = {
        id: uuid(),
        payload,
      }
      setActiveItem(newItem)
      setDrawState("drawing")
    }

    // if it exists, updating at same index
    // if not, create new
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
      setActiveItem({});
      setDrawState("saved")
    }

  }, [drawState, shapes]);


  // refactor this right-click to also
  // encompass menu launching logic
  const [menuOrigins, setMenuOrigins] = useState({ x: 0, y: 0});

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

  const handleSetActiveItem = useCallback((e, id) => {
    const activatedItem = shapes.find(({ id: existingId }) => id === existingId);
    setDrawState("drawing")
    setActiveItem(activatedItem)
  }, [activeItem, drawState])

  return (
    <div style={{ height: "100vh", width: "100vw" }} onClick={onClick} ref={bodyRef}>
      <Menu x={menuOrigins.x} y={menuOrigins.y} onClick={onClick} />
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


type Item = {
  id: string;
  payload: any;
}

const testItemPayload: Item[] = [
  {
    id: "",
    payload: {},
  }
]
