// @ts-nocheck
import React, {
  useCallback,
  useRef,
  useEffect,
  useState
} from "react";
import { render } from "react-dom";
import { useSvgDrawing } from "react-hooks-svgdrawing";
import Stage from "./Stage";

export default (props) => {
  const {
    // activeItem,
    drawState
  } = props;
  const drawingLine = useRef([]);
  const [ultimateRef, setRef] = useState();
  const [completeLine, setCompleteLine] = useState([]);
  const [
    renderRef,
    {
      getSvgXML,
    }
  ] = useSvgDrawing();


  
  
  const newRef = useRef();
  useEffect(() => {
    console.log('drawstate', drawState);
    const thang = drawState === "drawing" ? renderRef : newRef;
    setRef(thang);
    console.log()
  }, [drawState]);

  useEffect(() => {
    window.addEventListener("dragstart", handleDragStart);
    window.addEventListener("dragend", handleDragEnd);
    return () => {
      window.removeEventListener("dragstart", handleDragStart);
      window.removeEventListener("dragend", handleDragEnd);
    }
  }, []);


  const handleDragStart = useCallback(() => {
    // initialize drawing here
  }, []);

  const handleDragEnd = useCallback(() => {
    // make some calculation to get a managable payload
    // and track as state here
    const STUB__transformPayload = (payload) => {
      return payload;
    }

    if (drawLine.current) {
      const payload = STUB__transformPayload(drawLine.current);
      setCompleteLine(payload);
    }
  }, [drawState]);


  // height needs to be set b/c
  // of bug in react-hooks-svgdrawing
  return (
    <div ref={ultimateRef} style={{ height: '100vh' }}>
      <Stage
        lineBeingDrawn={drawingLine?.current}
        {...props}
      />
    </div>
  )
}
