// @ts-nocheck
import React, {
  useCallback,
  useRef,
  useEffect,
  useState
} from "react";
// import { transformSvgToJsx } from "../../utils/transformSvg";
import { useSvgDrawing } from "../../utils/useSvgDraw";
import { useAppState } from '../../AppProvider';
import Stage from "./Stage";

const extractPath = svg => {
  if (typeof svg !== "string") return false;
  const startIndex = svg.indexOf("path") + 8;
  const endIndex = svg.lastIndexOf("fill") - 2;
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

// const generateSvg = async (rawSvgInput) => {
//   return await transformSvgToJsx(rawSvgInput);
// }

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
  const setCallback = useCallback(async () => {
    // const stringPayload = getSvgXML();
    // console.log("oogabooga")
    // const Comp = await generateSvg(stringPayload);
    // console.log(">>newComp", Comp);
    // addItem(null, 'drawn', Comp);
    // setDrawState("init")

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
