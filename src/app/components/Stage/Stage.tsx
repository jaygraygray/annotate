import React, { useCallback } from "react";
import { Item } from '../../App';
import ItemRenderer from "../ItemRenderer";

type Props = {
  drawState: string;
  items: any;
  setActiveItem(o: Item): void;
  activeItem: Item;
  setDrawState: any;
}

const Stage = ({
  drawState,
  items = [],
  setActiveItem,
  activeItem,
  setDrawState,
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

  if (items.length) {
    return renderMap()
  }

}

export default Stage;