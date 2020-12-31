import React, { useCallback, useRef, useEffect } from "react";
import Stage from "./Stage";

export default (props) => {
  const {
    activeItem,
    drawState
  } = props;
  const drawingLine = useRef([]);
  
  useEffect(() => {
    
    drawingLine.current = [];
  }, [drawState]);

  const setDrawingLine = useCallback((line) => {
    if (drawingLine.current) {
      drawingLine.current = line;
    }
  }, []);

  const drawLine = useCallback((e) => {
    const { x, y  } = e;
    if (drawingLine.current) {
      const { current } = drawingLine
      setDrawingLine([
        { x, y, id: activeItem.id },
        ...current
      ])
    }
  }, []);

  return (
    <Stage
      drawLine={drawLine}
      lineBeingDrawn={drawingLine?.current}
      {...props}
    />
  )
}
