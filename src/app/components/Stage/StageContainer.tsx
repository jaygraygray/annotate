// @ts-nocheck
import React, {
  useCallback,
  useRef,
  useEffect,
  useState
} from "react";
import { useSvgDrawing } from "../../utils/useSvgDraw";
import { useAppState } from '../../AppProvider';
import Stage from "./Stage";

const extractPath = svg => {
  if (typeof svg !== "string") return false;
  const startIndex = svg.indexOf("path") + 8;
  const endIndex = svg.lastIndexOf("</path") - 1;
  return svg.substring(startIndex, endIndex);
}

const RenderSvg = ({ payload }) => {
  const path = extractPath(payload);
  console.log(">>path", path);
  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="764" width="920">
      <path d={path}></path>
    </svg>
  )
}

export default (props) => {
  const {
    // activeItem,
    drawState,
    setDrawState,
  } = props;
  const [activeRef, setRef] = useState<any>(React.createRef());
  const [completeLine, setCompleteLine] = useState<string>("");
  const [payload, setPayload] = useState<string>("");
  const [_, { addItem }] = useAppState();

  // need to reset drawState on mouse up
  // store SVG shape in store
  // 'reset' component to accept new drawings
  const setCallback = useCallback(() => {
    const stringPayload = getSvgXML();    
    const RenderTest = () => <RenderSvg payload={stringPayload} />
    addItem(null, 'drawn', RenderTest);
    setDrawState("init")

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
