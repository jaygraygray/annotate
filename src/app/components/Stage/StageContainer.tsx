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
import useOpenPlatformWindow from "../../lib/channelHooks/useOpenPlatformWindow";

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



const StageContainer = (props) => {
  const {
    // activeItem,
  } = props;
  const [completeLine, setCompleteLine] = useState<string>("");
  const [{ drawState }, _] = useAppState();

  return (
    <>
      <Stage
        completeLine={completeLine}
        {...props}
      />
    {drawState === "drawing" // this component needs to be rendered in the electron window.
      // all data being passed in must be available via hook
        ? <DrawingStage
            drawState={drawState}
          />
          : 
          <></>
      }
    </>
  )
}

export default StageContainer;


const DrawingStage = ({
  drawState
}) => {
  const Comp = React.cloneElement(<></>, {})

  const [activeRef, setRef] = useState<any>(React.createRef());
  const [_, { addItem, setDrawState }] = useAppState();

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


  const options = { setCallback }
  const [
    renderRef,
    {
      getSvgXML,
    }
  ] = useSvgDrawing(options);

  return (
    <div id={drawState === "drawing" ? "DRAWING_REF" : "unset"} ref={activeRef} style={{ height: "100vh" }} />
  )
}

