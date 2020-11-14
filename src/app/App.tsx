import React, { useEffect, useRef, useCallback, useState } from "react";
import AllItems from "./components/AllItems";

type DrawState = "placing" | "drawing" | "saved";

export const App = (props) => {
  const [drawState, setDrawState] = useState<DrawState>("placing"); 
  const bodyRef = useRef()
  const [shapes, setShapes] = useState([0]);
  const [activeItem, setActiveItem] = useState("0");

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
      setDrawState("drawing")
    }

    if (drawState === "drawing") {
      setDrawState("saved")
    }

  }, [drawState]);

  const removeShape = useCallback((e) => {
    e.preventDefault();
    const { path } = e;

    let newShapes = [];
    const [isOnShape] = path.filter(el => {
      if (el && el.id) {
        const elementId = parseInt(el.id)
        if (shapes.includes(elementId)) {
          newShapes = shapes.filter(shape => shape === el.id)
          return true;
        }
      }
      return false;
    })
    
    if (isOnShape) {
      setShapes(newShapes);
    }

  }, [shapes])

  return (
    <div style={{ height: "100vh", width: "100vw" }} onClick={onClick} ref={bodyRef}>
      <AllItems
        drawState={drawState}
        items={shapes}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
    </div>    
  );
}