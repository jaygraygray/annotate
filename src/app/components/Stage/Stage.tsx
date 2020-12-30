import React, { useCallback } from "react";
import { Item } from '../../App';
import ItemRenderer from "../ItemRenderer";

type Props = {
  drawState: string;
  shapes: any;
  setActiveItem(o: Item): void;
  activeItem: Item;
  setDrawState: any;
}

const Stage = ({
  drawState,
  shapes = [],
  setActiveItem,
  activeItem,
  setDrawState,
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

  const renderMap = () => (
    shapes.length && shapes.map(({ payload, id }) => 
      <ItemRenderer
        activeItemId={activeItem && activeItem.id}
        key={id}
        id={id}
        drawState={drawState}
        onSelectItem={onSelectItem}
        onEditComplete={onEditComplete}
        setDrawState={setDrawState}
        payload={payload}
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
        key={activeItem.id}
        id={activeItem.id}
        payload={activeItem.payload}
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

  if (shapes.length) {
    return renderMap()
  }

}

export default Stage;