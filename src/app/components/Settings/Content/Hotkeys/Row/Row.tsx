// @ts-ignore
import React, { useCallback, useEffect, useState } from "react";
import { Keys } from "../Keys";
import * as Style from "./Row.style";

type RowProps = {
  description: string;
  value: string[];
  label?: string;
  onEdit?(): void;
}

export const Row = ({ description, value, onEdit }: RowProps) => {
  // const handleEdit = useCallback(() => {
  //   if (onEdit) {
  //     onEdit();
  //   }
  // }, [onEdit]);


  return (
    <Style.HotkeyRow id="ROW">
      <Style.Description>{description}</Style.Description>
      <Style.KeysStyleWrapper activeHover={!!onEdit} id="KEYS">
        <div>
          <Keys id={value} value={value} />
        </div>
      <Style.EditTrigger>Click to change</Style.EditTrigger>
      </Style.KeysStyleWrapper>
    </Style.HotkeyRow>
  )
}