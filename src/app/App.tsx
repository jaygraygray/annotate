// @ts-nocheck
import React, { useEffect, useRef, useCallback, useState, useMemo } from "react";
import AllItems from "./components/AllItems";
import { BehaviorSubject } from "rxjs";

// click once, place FirstComponent
// capture mouse move events, modifying FirstStage OR rendering SecondStage, 
// second click, place SecondComponent OR place ThirdComponent


export const App = (props) => {
  const [drawState, setDrawState] = useState("placing"); 
  const bodyRef = useRef()
  const [shapes, setShapes] = useState([0]);
  const [activeItem, setActiveItem] = useState(0);
  console.log("activeItem", activeItem);

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
      // const newVal = shapes.length + 1
      // const newItems = [newVal, ...shapes]
      // setShapes(newItems)
      setDrawState("drawing")
    }

    if (drawState === "drawing") {
      setDrawState("saved")
    }

  }, [drawState]);

  // right-click:
  // // if right-clicking on an shape, remove it
  // // else, do nothing
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
        } else {
          return false;
        }
      }
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