// @ts-nocheck
import React, { useEffect, useRef, useCallback, useState, useMemo } from "react";
import { BehaviorSubject } from "rxjs";

// click once, place FirstComponent
// capture mouse move events, modifying FirstStage OR rendering SecondStage, 
// second click, place SecondComponent OR place ThirdComponent

const FirstStage = () => <div>I'm a default state </div>

const SecondStage = ({ onEditComplete, drawState, id }) => {
  const $coords = useMemo(() => new BehaviorSubject({ x: 0, y: 0 }), []);
  const drawingRef = useRef(null);

  const transformShape = useCallback((e) => {
    const { clientX, clientY } = e;
    if (drawingRef.current) {
      drawingRef.current.style.width = `${clientX}px`;
      drawingRef.current.style.height= `${clientY}px`;
    }
  }, [drawState])

  const handleOnEditComplete = useCallback(() => {
    if (drawingRef.current) {
      onEditComplete(drawingRef.current.style, id)
    }
  }, [id])

  useEffect(() => {
    if (drawState === "drawing") {
      window.addEventListener("mousemove", transformShape)
      window.addEventListener("mouseup", handleOnEditComplete)
    }
    return (() => {
      window.removeEventListener("mousemove", transformShape);
      window.removeEventListener("mouseup", handleOnEditComplete)
    })
  }, [drawState, handleOnEditComplete])

  return (
    <div
      ref={drawingRef}
      style={{
          width: `${$coords.value.x + 50}px`,
          border: "1px solid black"
        }}
    >
      Moving mouse to change shape
    </div>
  )
}

const ThirdStage = ({ onSelectItem, id }) => <div onClick={(e) => onSelectItem(e, id)} id={id}>shape is set</div>


const ItemRenderer = ({ drawState, onSelectItem, onEditComplete, id }) => {
  return (
    <div style={{ border: '1px solid red', padding: '25px', margin: '15px' }}>
      {drawState === "placing" && <FirstStage id={id} />}
      {drawState === "drawing" && <SecondStage id={id} onEditComplete={onEditComplete} drawState={drawState} />}
      {drawState === "saved" && <ThirdStage id={id} onSelectItem={onSelectItem} />}
    </div>
  )
}


const AllItems = ({
  drawState,
  items = [],
  setActiveItem,
}) => {

  const onEditComplete = useCallback((updatedItemStyle, itemId) => {
    // this is actually saving the item
    // console.log("STOP EDITING", updatedItemStyle, itemId)
  });

  const onSelectItem = useCallback((e, id) => {
    setActiveItem(id)
  })

  const renderMap = () => (
    items.map(item => 
      <ItemRenderer
        key={item}
        id={item}
        drawState={drawState}
        onSelectItem={onSelectItem}
        onEditComplete={onEditComplete}
      />
    )
  )
  return (
    <>
      {drawState !== "placing" ? renderMap() : <div>waiting to place shape</div>}
    </>
  )
}

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