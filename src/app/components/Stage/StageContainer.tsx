import React, {
  useCallback,
  useRef,
  useEffect,
  useState
} from "react";
import Stage from "./Stage";

export default (props) => {
  const {
    // activeItem,
    drawState
  } = props;
  const drawingLine = useRef([]);
  const [completeLine, setCompleteLine] = useState([])
  
  useEffect(() => {
    drawingLine.current = [];
  }, [drawState]);

  useEffect(() => {
    window.addEventListener("drag", handleDraw);
    window.addEventListener("dragstart", handleDragStart);
    window.addEventListener("dragend", handleDragEnd);
    return () => {
      window.removeEventListener("drag", handleDraw);
      window.removeEventListener("dragstart", handleDragStart);
      window.removeEventListener("dragend", handleDragEnd);
    }
  }, []);

  const setDrawingLine = useCallback((line) => {
    if (drawingLine.current) {
      drawingLine.current = line;
    }
  }, [drawingLine.current]);

  const drawLine = useCallback((e) => {
    const { x, y  } = e;
    if (drawingLine.current) {
      const { current } = drawingLine
      // const id = activeItem?.id;
      setDrawingLine([
        { x, y },
        ...current
      ])
    }
  }, []);

  const handleDraw = useCallback((e) => {
    drawLine(e);
  }, [drawLine]);

  const handleDragStart = useCallback(() => {
    console.log("START!!!!!!")
  }, []);

  const handleDragEnd = useCallback(() => {
    setCompleteLine(drawingLine.current)
  }, [drawState]);
  console.log("complete line:", completeLine);
  return (
    <Stage
      drawLine={drawLine}
      lineBeingDrawn={drawingLine?.current}
      {...props}
    />
  )
}
