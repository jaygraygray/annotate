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
  // rawCode is JSX! Not javascript!
  const ReactComponent = (rawCode) => {
    return Function('"use strict; return (' + rawCode + ')')();
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


  /**
   * <div id="DRAWING_REF" ref={activeRef} style={{ height: "100vh" }} /> 
   * needs to be extracted to own React component so even listeners can be removed
   * when component is reinstantiated, new even listneers will be added
   */


  // height needs to be set b/c
  // of bug in react-hooks-svgdrawing
  return (
    <>
      <Stage
        completeLine={completeLine}
        {...props}
      />
      {drawState === "drawing"
        ? <DrawingStage
            activeRef={activeRef}
            addItem={addItem}
            setDrawState={setDrawState}
            setRef={setRef}
            drawState={drawState}
          />
          : 
          <></>
      }
    </>
  )
}


const DrawingStage = ({
  activeRef,
  addItem,
  setDrawState,
  setRef,
  drawState,
}) => {

  const setCallback = async () => {
    const stringPayload = getSvgXML();
    const request = { params: [stringPayload] }
    
    const { component, id } = await useFirstChannel(request);    

    console.log(">>id!!!", id)
    addItem(null, 'drawn', component, id);
    setDrawState("init");
    setRef(null);

  };

    // these refs don't 100% matter since the drawing function is set
  // by global event listeners. those listeners need to be unset
  // on mouse up, but then still be available
  const newRef = useRef();
  useEffect(() => {
    const refToSet = drawState === "drawing" ? renderRef : newRef;
    setRef(refToSet);
  }, [drawState]);
  
  // useEffect(() => {
  //   setCompleteLine(payload);
  // }, [payload])


  const options = { setCallback }
  const [
    renderRef,
    {
      getSvgXML,
    }
  ] = useSvgDrawing(options);

  return (
    <div id="DRAWING_REF" ref={activeRef} style={{ height: "100vh" }} />
  )
}