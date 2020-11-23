// @ts-nocheck
import React, { useRef, useEffect } from "react";

const ThirdStage = ({
  onSelectItem,
  id,
  payload,
}) => {
  console.log("payload", payload)
  const itemRef = useRef(null);

  useEffect(() => {
    if (itemRef.current) {
      // itemRef.current.style = payload;
    }
  }, [payload])
  
  return (
    <div
      onClick={(e) => onSelectItem(e, id)}
      id={id}
      ref={itemRef}
      style={{
        width: payload && payload.width,
        height: payload && payload.height,
        top: payload && `${payload.top}px`,
        left: payload && `${payload.left}px`,
        position: "absolute",
        border: "1px solid blue"
      }}
    >
      shape is set: {id}
    </div>
  )
}

export default ThirdStage;