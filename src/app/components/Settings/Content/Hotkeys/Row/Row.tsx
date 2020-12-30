// @ts-nocheck
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import { Keys } from "../Keys";
import * as Style from "./Row.style";

type RowProps = {
  description: string;
  hotkeyValue: string[];
  hotkeyName?: string;
  label?: string;
}

// each row needs to manage its own state

export const Row = ({ description, hotkeyValue, hotkeyName = "" }: RowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newKeyValue, setNewKeyValue] = useState(hotkeyValue);

  const startEdit = useCallback((value) => {
    setIsEditing(value);
    setNewKeyValue([]);
  }, [isEditing])

  // onkeydown, start listening for keys
  // and storing them
  // onkeyup, use first 3 as new hot key
  const [keys, setKeys] = useState([]);
  const keysRef = React.useRef(null);

  const handleKeydown = useCallback((e) => {
    const { key } = e;
    const newKeys = [
      ...keys,
      key,
    ];
    setKeys(newKeys);
  }, [keys]);

  const handleKeyUp = useCallback((e) => {
    setNewKeyValue(keys);
    setIsEditing(false);
  }, [keys]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyUp);
    }
  }, [isEditing]);

  return (
    <Style.HotkeyRow id="ROW">
      <Style.Description>{description}</Style.Description>
      <Style.KeysStyleWrapper activeHover={!!hotkeyName} id="KEYS">
        <div>
          <Keys id={hotkeyValue} hotkeyValue={newKeyValue} isEditing={isEditing} />
        </div>
      <Style.EditTrigger onClick={() => startEdit(true)}>Click to change</Style.EditTrigger>
      </Style.KeysStyleWrapper>
    </Style.HotkeyRow>
  )
}