import React, {
  useRef,
  useCallback,
  useEffect,
  useState
} from "react";

type Props = {
  onEditComplete(itemPayload: any, itemId: string): void;
  drawState: string;
  id: string;
  handleDrawLine: any;
}

const SecondStage = ({
  onEditComplete,
  drawState,
  id,
  handleDrawLine,
}: Props) => {
  const drawingRef = useRef(null);
  const [origins, setOrigins] = useState({ originX: 0, originY: 0})

  // this fires after drawing has completed
  const captureDestination = useCallback((e) => {
    // console.log("CAPTURE", e)
    const { screenX, screenY } = e
    setOrigins({
      originX: screenX,
      originY: screenY,
    })
  }, [id])

  const transformShape = useCallback((e) => {
    // console.log("DRAW", e)
    handleDrawLine(e)
  }, [drawState])

  const handleOnEditComplete = useCallback(() => {
    // console.log("SAVE")
  }, [id, origins])

  useEffect(() => {
    if (drawState === "drawing") {
      window.addEventListener("mousemove", transformShape);
      window.addEventListener("mouseup", handleOnEditComplete);
      window.addEventListener("mousedown", captureDestination);
    }
    return (() => {
      window.removeEventListener("mousemove", transformShape);
      window.removeEventListener("mouseup", handleOnEditComplete);
      window.removeEventListener("mousedown", captureDestination)
    })
  }, [drawState, handleOnEditComplete])

  return (
    <div
      ref={drawingRef}
      style={{
          // width: `${$coords.value.x + 50}px`,
          // border: "1px solid black",
          // position: "absolute",
          // top: `${origins.top}px`,
          // left: `${origins.left}px`,
        }}
    >
      Moving mouse to change shape: {id} <br />
    </div>
  )
}

export default SecondStage;