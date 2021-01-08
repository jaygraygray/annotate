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
  const [activeRef, setRef] = useState(React.createRef());
  const [completeLine, setCompleteLine] = useState([]);
  const [payload, setPayload] = useState();

  const options = {};
  const [
    renderRef,
    {
      getSvgXML,
    }
  ] = useSvgDrawing(options);

  const newRef = useRef();
  useEffect(() => {
    const thang = drawState === "drawing" ? renderRef : newRef;
    setRef(thang);
  }, [drawState]);
  
  useEffect(() => {
    setPayload(getSvgXML())
<<<<<<< Updated upstream
  }, [getSvgXML])
=======
  }, [getSvgXML, activeRef])
>>>>>>> Stashed changes

  useEffect(() => {
    console.log("payload length!", payload?.length);
  }, [payload])


  const handleMouseUp = useCallback(() => {
    setRef(newRef);
    const STUB__transformPayload = (payload) => {
      return payload;
    }

    const payload = STUB__transformPayload(null);
    setCompleteLine(payload);
  }, [payload]);

  useEffect(() => {
    if (activeRef.current) {
      console.log('listener set', payload)
      activeRef.current.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      if (activeRef.current) {
        activeRef.current.removeEventListener("mouseup", handleMouseUp);
      }
    }
  }, [payload]);


  // height needs to be set b/c
  // of bug in react-hooks-svgdrawing
  return (
    <>
      <Stage
        completeLine={completeLine}
        {...props}
      />
      <div ref={activeRef} style={{ height: '100vh' }} />
    </>
  )
}
