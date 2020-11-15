import React, { useCallback } from "react";
import { Item } from '../../App';
import ItemRenderer from "../ItemRenderer";

type Props = {
  drawState: string;
  items: any;
  setActiveItem(itemId: string): void;
  activeItem: Item;
}

const AllItems = ({
  drawState,
  items = [],
  setActiveItem,
  activeItem,
}: Props) => {

  const onEditComplete = useCallback((updatedItemStyle, itemId) => {
    // this is actually saving the item
    // console.log("STOP EDITING", updatedItemStyle, itemId)
  }, []);

  const onSelectItem = useCallback((e, id) => {
    setActiveItem(id)
  }, [])
  console.log("activeItem: ", activeItem);
  const renderMap = () => (
    items.map(({ payload, id }) => 
      <ItemRenderer
        activeItemId={activeItem.id}
        key={id}
        id={id}
        drawState={drawState}
        onSelectItem={onSelectItem}
        onEditComplete={onEditComplete}
      />
    )
  )

  if (drawState === "drawing") {
    return (
      <ItemRenderer
        activeItemId={activeItem.id}
        key={activeItem.id}
        id={activeItem.id}
        drawState={drawState}
        onSelectItem={onSelectItem}
        onEditComplete={onEditComplete}
      />
    )
  }

  if (drawState === "placing") {
    return <>waiting to place shape</>
  }

  return renderMap()
}

export default AllItems;