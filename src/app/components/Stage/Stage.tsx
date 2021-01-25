import React, { SyntheticEvent, useCallback, useEffect } from "react";
import { Item } from '../../types';
import ItemRenderer from "../ItemRenderer";

type Props = {
  drawState: string;
  items: any;
  setActiveItem(o: Item): void;
  activeItem: Item;
  setDrawState: any;
  drawLine(e: SyntheticEvent): void;
  completeLine: string;
}

const Stage = (
  {
    drawState,
    items = [],
    setActiveItem,
    activeItem,
    setDrawState,
    completeLine,
  }: Props) => {
  
  const onEditComplete = useCallback((updatedItemStyle, itemId) => {
    let item = items.find(({ id: existingId }) => itemId === existingId);
    if (item) {
      item.payload = updatedItemStyle;
      setActiveItem(item);
    }
  }, [items]);

  const onSelectItem = useCallback((e, id) => {
    const item = items.find(({ id: existingId }) => id === existingId)
    setActiveItem(item)
  }, [items])

  useEffect(() => {
    //console.log(">>completeLine", completeLine);
  }, [completeLine])


  // needs to be generic: render all types of items
  // important because all items will have different behaviors
  const renderAllFinishedShapes = () => (
    items.length && items.map(({ payload, id }) => 
      <ItemRenderer
        activeItemId={activeItem && activeItem.id}
        drawState={drawState}
        id={id}
        key={id}
        onEditComplete={onEditComplete}
        onSelectItem={onSelectItem}
        payload={payload}
        setDrawState={setDrawState}
      />
    )
  )

  if (drawState === "init") {
    return null;
  }

  if (drawState === "drawing" && activeItem) {
    return (
      <ItemRenderer
        activeItemId={activeItem.id}
        drawState={drawState}
        id={activeItem.id}
        key={activeItem.id}
        onEditComplete={onEditComplete}
        onSelectItem={onSelectItem}
        payload={activeItem.payload}
        setDrawState={setDrawState}
      />
    )
  }

  if (drawState === "placing") {
    return <>waiting to place shape</>
  }

  if (items.length) {
    return renderAllFinishedShapes()
  }

}

export default Stage;