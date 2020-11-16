// @ts-nocheck
import React, { useEffect, useRef, useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import AllItems from "./components/AllItems";
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
    if (drawState === "placing") {
      const newItem = {
        id: uuid(),
        payload: null
      }
      console.log("e", e)
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

  const removeShape = useCallback((e) => {
    e.preventDefault();
    const { path } = e;

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
    }

  }, [shapes])

  const handleSetActiveItem = useCallback((e, id) => {
    const activatedItem = shapes.find(({ id: existingId }) => id === existingId);
    setDrawState("drawing")
    setActiveItem(activatedItem)
  }, [activeItem, drawState])

  return (
    <div style={{ height: "100vh", width: "100vw" }} onClick={onClick} ref={bodyRef}>
      <AllItems
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
