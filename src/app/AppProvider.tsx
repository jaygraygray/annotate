// @ts-nocheck
import React, { createContext, useReducer, useContext, useCallback } from "react";
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

export function useAppState() {
  return [useContext(StateContext), useContext(UpdateContext)]
}

const PayloadRender = () => <div>uhmm</div>

const initItems = [
  { id: 0, type: "drawn", payload: PayloadRender }
]

export const AppProvider: React.FC = (props) => {
  const [drawState, setDrawState] = useReducer(produce, "init");
  const [newItems, setNewItems] = useReducer<any>(produce, initItems);

  const addItem = useCallback((e, type, payload) => {
    console.log(">>e", e);
    const itemAdded = {
      type: 'drawn',
      payload: PayloadRender,
      id: newItems.length + 1
    }
    setNewItems(newItems => [itemAdded, ...newItems])
  }, [newItems]);

  console.log("newItems", newItems);
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

