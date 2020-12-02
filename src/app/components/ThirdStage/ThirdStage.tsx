import React, { useRef, useEffect } from "react";

const ThirdStage = ({
  onSelectItem,
  id,
  payload,
}) => {
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
        top: payload && `${payload.originX}px`,
        left: payload && `${payload.originY}px`,
        border: "1px solid blue"
      }}
    >
      shape is set: {id}
    </div>
  )
}

export default ThirdStage;