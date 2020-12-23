// @ts-ignore
import React, { useCallback, useEffect, useState } from "react";
import { Keys } from "../Keys";
import * as Style from "./Row.style";

type DescriptionProps = {
  children: React.ReactNode;
  id?: string;
}
const Description = ({ children }: DescriptionProps) => <Style.Description>{children}</Style.Description>

type RowProps = {
  description: string;
  value: string[];
  label?: string;
  onEdit?(): void;
}

export const Row = ({ description, value, onEdit }: RowProps) => {
  const [showEditOption, setEditOption] = useState(false);

  // const handleEdit = useCallback(() => {
  //   if (onEdit) {
  //     onEdit();
  //   }
  // }, [onEdit]);

  const handleMouseOver = useCallback((e) => {
    const { target: { id } } = e;
    if (id === "DESCRIPTION") {
      setEditOption(false);
    }
    if (id === "ROW") {
      console.log("over")
      setEditOption(true);
    }
  }, [showEditOption]);

  const handleMouseOut = useCallback((e) => {
    const { target: { id } } = e;
    if (id === "DESCRIPTION") {
      setEditOption(true);
    }
    if (id === "ROW") {
      console.log("out")
      setEditOption(false);
    }
  }, [showEditOption])

  return (
    <Style.HotkeyRow onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} id="ROW">
      <Description id="DESCRIPTION">{description}</Description>
      {showEditOption ? <div>Click to change</div> : <Keys id="KEYS" value={value} />}
    </Style.HotkeyRow>
  )
}