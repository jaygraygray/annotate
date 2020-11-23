import React, { useMemo, useRef, useCallback, useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

type Props = {
  onEditComplete(itemPayload: any, itemId: string): void;
  drawState: string;
  id: string;
}

const SecondStage = ({
  onEditComplete,
  drawState,
  id,
}: Props) => {
  const $coords = useMemo(() => new BehaviorSubject({ x: 0, y: 0 }), []);
  const drawingRef = useRef(null);
  const [origins, setOrigins] = useState({ top: 0, left: 0})

  const captureOrigins = useCallback((e) => {
    console.log("CAPTURE", e)
    const { screenX, screenY } = e
    setOrigins({
      top: screenX,
      left: screenY,
    })
  }, [id])

  const transformShape = useCallback((e) => {
    const { clientX, clientY } = e;
    if (drawingRef.current) {
      drawingRef.current.style.width = `${clientX}px`;
      drawingRef.current.style.height = `${clientY}px`;
      drawingRef.current.style.top = `${origins.top}`;
      drawingRef.current.style.left= `${origins.left};`
    }
  }, [drawState])

  const handleOnEditComplete = useCallback(() => {
    if (drawingRef.current) {
      const  { current: { style } } = drawingRef;
      const updatedStyle = {
        width: style.width,
        height: style.height,
        top: origins.top,
        left: origins.left,
      }
      onEditComplete(updatedStyle, id)
    }
  }, [id, origins])

  useEffect(() => {
    if (drawState === "drawing") {
      window.addEventListener("mousemove", transformShape);
      window.addEventListener("mouseup", handleOnEditComplete);
      window.addEventListener("mousedown", captureOrigins);
    }
    return (() => {
      window.removeEventListener("mousemove", transformShape);
      window.removeEventListener("mouseup", handleOnEditComplete);
      window.removeEventListener("mousedown", captureOrigins)
    })
  }, [drawState, handleOnEditComplete])

  return (
    <div
      ref={drawingRef}
      style={{
          width: `${$coords.value.x + 50}px`,
          border: "1px solid black",
          position: "absolute",
          top: `${origins.top}px`,
          left: `${origins.left}px`,
        }}
    >
      Moving mouse to change shape: {id}
    </div>
  )
}

export default SecondStage;