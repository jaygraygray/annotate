import React, { useMemo, useRef, useCallback, useEffect } from "react";
import { BehaviorSubject } from "rxjs";

type Props = {
  onEditComplete(itemPayload: any, itemId: string): void;
  drawState: string;
  id: string;
}

const SecondStage = ({
  onEditComplete,
  drawState,
  id
}: Props) => {
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

export default SecondStage;