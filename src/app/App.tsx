// @ts-nocheck
import React, { useEffect, useRef, useCallback, useState, useMemo } from "react";
import { BehaviorSubject } from "rxjs";

// click once, place FirstComponent
// capture mouse move events, modifying FirstStage OR rendering SecondStage, 
// second click, place SecondComponent OR place ThirdComponent

const FirstStage = () => <div>I'm a default state </div>

const SecondStage = ({ onEditComplete, drawState }) => {
  const $coords = useMemo(() => new BehaviorSubject({ x: 0, y: 0 }), []);
  const drawingRef = useRef(null);

  const transformShape = useCallback((e) => {
    const { clientX, clientY } = e;
    if (drawingRef.current) {
      drawingRef.current.style.width = `${clientX}px`;
      drawingRef.current.style.height= `${clientY}px`;
    }
  }, [drawState])

  useEffect(() => {
    if (drawState === "drawing") {
      window.addEventListener("mousemove", transformShape)
      window.addEventListener("mouseup", onEditComplete)
    }
    return (() => {
      window.removeEventListener("mousemove", transformShape);
      window.removeEventListener("mouseup", onEditComplete)
    })
  }, [drawState, onEditComplete])

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

const ThirdStage = ({ onSelectItem }) => <div onClick={onSelectItem} id="SHAPE_BITCH">shape is set</div>


const ItemRenderer = ({ drawState, onSelectItem, onEditComplete, id }) => {
  return (
    <div style={{ border: '1px solid red', padding: '25px', margin: '15px' }}>
      {drawState === "placing" && <FirstStage />}
      {drawState === "drawing" && <SecondStage onEditComplete={onEditComplete} drawState={drawState} />}
      {drawState === "saved" && <ThirdStage onSelectItem={onSelectItem} />}
    </div>
  )
}


const AllItems = ({ drawState, items = [] }) => {
  const onEditComplete = useCallback(() => {
    // this is actually saving the item
    console.log("STOP EDITING")
  });

  const onSelectItem = useCallback((e, id) => console.log(`selecting item ${id}`));

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
      {drawState !== "init" ? renderMap() : null}
    </>
  )
}

export const App = (props) => {
  const [drawState, setDrawState] = useState("placing"); 
  const bodyRef = useRef()
  const [numItems, setNumItems] = useState([1]);
  const [activeItem, setActiveItem] = useState(1);

  const onClick = useCallback((e) => {
    if (drawState === "placing") {
      // const newVal = numItems.length + 1
      // const newItems = [newVal, ...numItems]
      // setNumItems(newItems)
      setDrawState("drawing")
    }

    if (drawState === "drawing") {
      setDrawState("saved")
    }

    if (drawState === "saved") {
      // if an editable item is clicked, do nada here!
      if (e.target.id !== "SHAPE_BITCH") {
        setDrawState("placing")
      }
    }
  }, [drawState]);

  const captureMove = useCallback((e) => {
    if (drawState === "drawing") {
      console.log('start drawing')
    }
  }, [drawState]);


  return (
    <div style={{ height: "100vh", width: "100vw" }} onClick={onClick} ref={bodyRef}>
      <AllItems drawState={drawState} items={numItems} activeItem={activeItem} />
    </div>    
  );
}