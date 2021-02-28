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

  // this render logic is borked.
  // the drawing stage needs to sit on top of everything else with
  // a transparent background. when drawing, the stage disappears.
  return (
    <>
      <Stage {...props} />
    {drawState === "drawing" 
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


// needs to be rendered in a portal
// with a transparent background
const DrawingStage = ({
  drawState
}) => {

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
    document.getElementById("app").classList.remove("clickable")

  };

    // these refs don't 100% matter since the drawing function is set
  // by global event listeners. those listeners need to be unset
  // on mouse up, but then still be available
  const newRef = useRef();
  useEffect(() => {
    const refToSet = drawState === "drawing" ? renderRef : newRef;
    setRef(refToSet);
  }, [drawState]);


  const options = { setCallback, fill: "none" }
  const [
    renderRef,
    {
      getSvgXML,
    }
  ] = useSvgDrawing(options);

  return (
    <div
      id={drawState === "drawing" ? "DRAWING_REF" : "unset"}
      ref={activeRef}
      style={{ height: "100vh",  backgroundColor: "transparent", zIndex: 9000, position: 'absolute', top: 0, left: 0 }}
      >
        the drawing stage is rendered
      </div>
  )
}


import ReactDOM from "react-dom";
const portalRoot = document.getElementById("portal-root")
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.element = document.createElement('div')
  }

  componentDidMount() {
    portalRoot.appendChild(this.element);
  }

  componentWillUnmount() {
    portalRoot.removeChild(this.element);
  }

  render() {
    return (
      ReactDOM.createPortal(
        this.props.children,
        this.element
      )
    )
  }
}