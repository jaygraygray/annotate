// @ts-nocheck
import React, { createContext, useReducer, useContext, useCallback } from "react";
import { v4 as uuidv4 } from 'uuid';
import produce from "immer";
import state from "./lib/store";
import { StageState } from "./types";

// function debugFn() {
//   if (process.env.NODE_ENV === "development") {
//     throw new Error("Updater was called without a wrapping provider.");
//   }
// }

export const AppContext = createContext<Partial<StageState>>(null);

const StateContext = createContext<any>(state);
const UpdateContext = createContext<any>(null);

// Create consumer for ipcRenderer messages

export function useAppState() {
  return [useContext(StateContext), useContext(UpdateContext)]
}

const initItems = [
  { id: 0, type: "drawn", payload: '<div>testyo</div>' }
]

export const AppProvider: React.FC = (props) => {
  const [drawState, updateDrawState] = useReducer(produce, "init");
  const [newItems, setNewItems] = useReducer<any>(produce, initItems);

  const addItem = useCallback((e, type, payload, id) => {
    const itemAdded = {
      type,
      payload: payload,
      id: id ? id : uuidv4()
    }
    setNewItems(newItems => [itemAdded, ...newItems])
  }, [newItems])

  const setDrawState = useCallback((drawState) => {
    updateDrawState(() => drawState)
  }, []);

  return (
    <UpdateContext.Provider value={{
      setDrawState,
      addItem,
    }}>
      <StateContext.Provider value={{
        drawState,
        newItems
      }}>
        {props.children}
      </StateContext.Provider>
    </UpdateContext.Provider>
  )
}

