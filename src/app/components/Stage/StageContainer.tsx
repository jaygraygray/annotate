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
  }, [getSvgXML])

  useEffect(() => {
    console.log("payload updated!", payload);
  }, [payload])


  return (
    <>
      <Stage
        lineBeingDrawn={drawingLine?.current}
        {...props}
      />
      <div ref={activeRef} style={{ height: '100vh' }} />
    </>
  )
}
