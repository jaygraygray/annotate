import React, { useCallback } from "react";
import FirstStage from "../FirstStage";
import SecondStage from "../SecondStage";
import ThirdStage from "../ThirdStage";

type Props = {
  drawState: string;
  onSelectItem(itemPayload: any, itemId: string): void;
  onEditComplete(e: MouseEvent, id: string): void;
  id: string;
  activeItemId: string;
  setDrawState: any;
}

const ItemRenderer = ({
  drawState,
  onSelectItem,
  onEditComplete,
  activeItemId,
  id,
  setDrawState,
}: Props) => {

  const renderSecondStage = (drawState === "drawing") && activeItemId === id;

  const handleSelectItem = useCallback((e, id) => {
    setDrawState("drawing")
    onSelectItem(e, id);
  }, [activeItemId])

  return (
    <div style={{ border: '1px solid red', padding: '25px', margin: '15px' }}>
      {drawState === "placing" && <FirstStage id={id} />}
      {renderSecondStage && <SecondStage id={id} onEditComplete={onEditComplete} drawState={drawState} />}
      {drawState === "saved" && <ThirdStage id={id} onSelectItem={handleSelectItem} />}
    </div>
  )
}

export default ItemRenderer;