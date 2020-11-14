import React from "react";
import FirstStage from "../FirstStage";
import SecondStage from "../SecondStage";
import ThirdStage from "../ThirdStage";

type Props = {
  drawState: string;
  onSelectItem(itemPayload: any, itemId: string): void;
  onEditComplete(e: MouseEvent, id: string): void;
  id: string;
}

const ItemRenderer = ({
  drawState,
  onSelectItem,
  onEditComplete,
  id
}: Props) => {
  return (
    <div style={{ border: '1px solid red', padding: '25px', margin: '15px' }}>
      {drawState === "placing" && <FirstStage id={id} />}
      {drawState === "drawing" && <SecondStage id={id} onEditComplete={onEditComplete} drawState={drawState} />}
      {drawState === "saved" && <ThirdStage id={id} onSelectItem={onSelectItem} />}
    </div>
  )
}

export default ItemRenderer;