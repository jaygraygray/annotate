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
  payload: any;
  handleDrawLine?: any;
  lineBeingDrawn?: any;
}

const ItemRenderer = ({
  drawState,
  onSelectItem,
  onEditComplete,
  activeItemId,
  id,
  setDrawState,
  payload,
  handleDrawLine,
  lineBeingDrawn
}: Props) => {

  const renderSecondStage = (drawState === "drawing") && activeItemId === id;

  const handleSelectItem = useCallback((e, id) => {
    setDrawState("drawing")
    onSelectItem(e, id);
  }, [activeItemId])
  
  return (
    <div
      style={{
        border: '1px solid red',
        padding: '10px',
        margin: '10px',
        display: "inline-block",
      }}
    >
      {drawState === "placing" &&
        <FirstStage
          id={id}
        />
      }

      {renderSecondStage &&
        <SecondStage
          drawState={drawState}
          id={id}
          onEditComplete={onEditComplete}
          handleDrawLine={handleDrawLine}
          lineBeingDrawn={lineBeingDrawn}
        />
      }

      {drawState === "saved" &&
        <ThirdStage
          id={id}
          onSelectItem={handleSelectItem}
          payload={payload}
        />
      }
    </div>
  )
}

export default ItemRenderer;