import React, {
  useCallback,
  useRef,
  useEffect,
  useState
} from "react";
import { useSvgDrawing } from "../../utils/useSvgDraw";
import Stage from "./Stage";

export default (props) => {
  const {
    // activeItem,
    drawState,
    setDrawState,
  } = props;
  const [activeRef, setRef] = useState<any>(React.createRef());
  const [completeLine, setCompleteLine] = useState<string>("");
  const [payload, setPayload] = useState<string>("");
  
  const options = {}
  const [
    renderRef,
    {
      getSvgXML,
      setCallback
    }
    // @ts-ignore
    // HACK SVG DRAWING
    // TAKE WHAT'S NECESSARY
    // NOTHING MORE, port all to app
  ] = useSvgDrawing(options);

  const onComplete = () => console.log('yeeehawwww')

  useEffect(() => {
    if (setCallback) {
      setCallback(onComplete)
    }
  }, [setCallback])

  const newRef = useRef();
  useEffect(() => {
    const thang = drawState === "drawing" ? renderRef : newRef;
    setRef(thang);
  }, [drawState]);
  
  useEffect(() => {
    setCompleteLine(payload);
  }, [payload])


  // the svg needs to be rendered in the electron layer
  // of the application due to 
  const handleMouseDown = useCallback(() => {
    const payload = getSvgXML();
    //console.log(">>>payload", payload?.length)
    setPayload(payload);
    setRef(null);
    if (drawState === "drawing") {
      setDrawState("saved");
    }
  }, [drawState, getSvgXML]);

  useEffect(() => {
    if (activeRef?.current) {
      activeRef.current.addEventListener("mousedown", handleMouseDown);
    }
    return () => {
      if (activeRef?.current) {
        activeRef.current.removeEventListener("mousedown", handleMouseDown);
      }
    }
  }, [payload, drawState, getSvgXML]);


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
