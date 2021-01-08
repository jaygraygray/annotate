import React, { SyntheticEvent, useCallback, useEffect } from "react";
import { Item } from '../../App';
import ItemRenderer from "../ItemRenderer";

type Props = {
  drawState: string;
  shapes: any;
  setActiveItem(o: Item): void;
  activeItem: Item;
  setDrawState: any;
  drawLine(e: SyntheticEvent): void;
  completeLine: string;
}

const Stage = (
  {
    drawState,
    shapes = [],
    setActiveItem,
    activeItem,
    setDrawState,
    completeLine,
  }: Props) => {
  
  const onEditComplete = useCallback((updatedItemStyle, itemId) => {
    let item = shapes.find(({ id: existingId }) => itemId === existingId);
    if (item) {
      item.payload = updatedItemStyle;
      setActiveItem(item);
    }
  }, [shapes]);

  const onSelectItem = useCallback((e, id) => {
    const item = shapes.find(({ id: existingId }) => id === existingId)
    setActiveItem(item)
  }, [shapes])

  useEffect(() => {
    console.log(">>completeLine", completeLine);
  }, [completeLine])


  // needs to be generic: render all types of shapes
  // important because all shapes will have different behaviors
  const renderAllFinishedShapes = () => (
    shapes.length && shapes.map(({ payload, id }) => 
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

  if (shapes.length) {
    return renderAllFinishedShapes()
  }

}

export default Stage;