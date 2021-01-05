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
  const [ultimateRef, setRef] = useState(React.createRef());
  const [completeLine, setCompleteLine] = useState([]);
  const [payload, setPayload] = useState();

  // will need to fork this lib to
  // accept callbacks
  const [
    renderRef,
    {
      getSvgXML,
      // onCompleteCallback
    }
  ] = useSvgDrawing();

  const newRef = useRef();
  useEffect(() => {
    console.log('drawstate', drawState);
    const thang = drawState === "drawing" ? renderRef : newRef;
    setRef(thang);
  }, [drawState]);
  
  useEffect(() => {
    setPayload(getSvgXML())
  }, [getSvgXML, ultimateRef])

  useEffect(() => {
    console.log("payload updated!", payload);
  }, [payload])

  const handleDragStart = useCallback(() => {
    // initialize drawing here
  }, []);

  const handleDragEnd = useCallback(() => {
    console.log("click", payload)
    setRef(newRef);
    const STUB__transformPayload = (payload) => {
      return payload;
    }

    const payload = STUB__transformPayload(null);
    setCompleteLine(payload);
  }, [payload]);

  useEffect(() => {
    if (ultimateRef.current) {
      console.log('listener set', payload)
      ultimateRef.current.addEventListener("dragstart", handleDragStart);
      ultimateRef.current.addEventListener("mouseup", handleDragEnd);
    }
    return () => {
      if (ultimateRef.current) {
        ultimateRef.current.removeEventListener("dragstart", handleDragStart);
        ultimateRef.current.removeEventListener("mouseup", handleDragEnd);
      }
    }
  }, [payload]);


  // height needs to be set b/c
  // of bug in react-hooks-svgdrawing
  return (
    <>
      <Stage
        lineBeingDrawn={drawingLine?.current}
        {...props}
      />
      <div ref={ultimateRef} style={{ height: '100vh' }} />
    </>
  )
}
