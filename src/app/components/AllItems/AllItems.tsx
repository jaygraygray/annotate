import React, { useCallback } from "react";
import ItemRenderer from "../ItemRenderer";

const AllItems = ({
  drawState,
  items = [],
  setActiveItem,
}) => {

  const onEditComplete = useCallback((updatedItemStyle, itemId) => {
    // this is actually saving the item
    // console.log("STOP EDITING", updatedItemStyle, itemId)
  }, []);

  const onSelectItem = useCallback((e, id) => {
    setActiveItem(id)
  }, [])

  const renderMap = () => (
    items.map(item => 
      <ItemRenderer
        key={item}
        id={item}
        drawState={drawState}
        onSelectItem={onSelectItem}
        onEditComplete={onEditComplete}
      />
    )
  )
  return (
    <>
      {drawState !== "placing" ? renderMap() : <div>waiting to place shape</div>}
    </>
  )
}

export default AllItems;