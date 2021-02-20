// @ts-nocheck
import React, {
  useCallback,
  useRef,
  useEffect,
  useState
} from "react";

import useFirstChannel from "../../lib/channelHooks/useFirstChannel";
import { useSvgDrawing } from "../../utils/useSvgDraw";
import { useAppState } from '../../AppProvider';
import Stage from "./Stage";

const extractPath = svg => {
  if (typeof svg !== "string") return false;
  const startIndex = svg.indexOf("path") + 8;
  const endIndex = svg.lastIndexOf("fill") - 2;
  return svg.substring(startIndex, endIndex);
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

  // rawCode is JSX! Not javascript!
  const ReactComponent = (rawCode) => {
    return Function('"use strict; return (' + rawCode + ')')();
  }

  // need to reset drawState on mouse up
  // store SVG shape in store
  // 'reset' component to accept new drawings
  const setCallback = useCallback(async () => {
    const stringPayload = getSvgXML();
    const request = { params: [stringPayload] }
    
    const rawComponent = await useFirstChannel(request);    

    addItem(null, 'drawn', rawComponent);
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
