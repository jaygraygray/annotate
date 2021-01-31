// @ts-nocheck
import React, {
  useCallback,
  useRef,
  useEffect,
  useState
} from "react";
import { useSvgDrawing } from "../../utils/useSvgDraw";
import Stage from "./Stage";

// need to avoid creating tightly coupled components
// basically at all costs. that"s how to build an app that scales

export default (props) => {
  const {
    // activeItem,
    drawState,
    setDrawState,
  } = props;
  const [activeRef, setRef] = useState<any>(React.createRef());
  const [completeLine, setCompleteLine] = useState<string>("");
  const [payload, setPayload] = useState<string>("");
  
  // onMouseUp has to set drawState
  // save new shape
  const setCallback = useCallback(() => {
    const payload = getSvgXML();
    console.log(">>>payload", payload?.length)
    setPayload(payload);
    // if (drawState === "drawing") {
    //   setDrawState("saved")
    // }
  }, [drawState]);

  const options = { setCallback }
  const [
    renderRef,
    {
      getSvgXML,
    }
  ] = useSvgDrawing(options);


  const newRef = useRef();
  useEffect(() => {
    console.log(">>drawState", drawState);
    const refToSet = drawState === "drawing" ? renderRef : newRef;
    setRef(refToSet);
  }, [drawState]);
  
  useEffect(() => {
    setCompleteLine(payload);
  }, [payload])

  // height needs to be set b/c
  // of bug in react-hooks-svgdrawing
  return (
    <>
      <Stage
        completeLine={completeLine}
        {...props}
      />
      <div ref={activeRef} style={{ height: "100vh" }} />
    </>
  )
}
