import React, { useCallback } from "react";
import { Item } from '../../App';
import ItemRenderer from "../ItemRenderer";

type Props = {
  drawState: string;
  items: any;
  setActiveItem(itemId: string): void;
  activeItem: Item;
  setDrawState: any;
}

const AllItems = ({
  drawState,
  items = [],
  setActiveItem,
  activeItem,
  setDrawState,
}: Props) => {

  const onEditComplete = useCallback((updatedItemStyle, itemId) => {
    // this is actually saving the item
    // console.log("STOP EDITING", updatedItemStyle, itemId)
  }, []);

  const onSelectItem = useCallback((e, id) => {
    const item = items.find(({ id: existingId }) => id === existingId)
    setActiveItem(item)
  }, [items])


  const renderMap = () => (
    items.length && items.map(({ payload, id }) => 
      <ItemRenderer
        activeItemId={activeItem && activeItem.id}
        key={id}
        id={id}
        drawState={drawState}
        onSelectItem={onSelectItem}
        onEditComplete={onEditComplete}
        setDrawState={setDrawState}
      />
    )
  )

  if (drawState === "drawing" && activeItem) {
    return (
      <ItemRenderer
        activeItemId={activeItem.id}
        key={activeItem.id}
        id={activeItem.id}
        drawState={drawState}
        onSelectItem={onSelectItem}
        onEditComplete={onEditComplete}
        setDrawState={setDrawState}
      />
    )
  }

  if (drawState === "placing") {
    return <>waiting to place shape</>
  }

  if (items.length) {
    return renderMap()
  }
}

export default AllItems;