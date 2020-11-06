// @ts-nocheck
import React, { useEffect, useRef, useCallback, useState } from "react";


// click once, place FirstComponent
// capture mouse move events
// second click, place SecondComponent

const FirstComp = () => <div>I am first!</div>
const SecondComp = () => <div>Second!!!</div>
const Renderer = ({ status }) => {
  console.log(">>status", status);
  return (
    <>
      {status === "placing" && <FirstComp />}
      {status === "drawing" && <SecondComp />}
    </>
  )
}

export const App = (props) => {
  const [drawState, setDrawState] = useState("placing");
  const bodyRef = useRef()

  const onClick = useCallback(() => {
    if (drawState === "placing") {
      setDrawState("drawing")
    }

    if (drawState === "drawing") {
      setDrawState("placing")
    }
  }, [drawState]);

  const captureMove = useCallback((e) => {
    if (drawState === "drawing") {
      console.log(">>> mouse event", e)
    }
  }, [drawState]);


  return (
    <div style={{ height: "100vh", width: "100vw" }} onClick={onClick} onMouseMove={captureMove} ref={bodyRef}>
      <Renderer status={drawState} />
    </div>    
  );
}