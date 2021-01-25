// @ts-nocheck
import React, { createContext, useReducer, useContext } from 'react';
import produce from 'immer';
import state from './lib/store';
import { StageState } from './types';

function debugFn() {
  if (process.env.NODE_ENV === 'development') {
    throw new Error('Updater was called without a wrapping provider.');
  }
}

export const AppContext = createContext<Partial<StageState>>(null);

const StateContext = createContext(state);
const UpdateContext = createContext(null);

export const AppProvider: React.FC = (props) => {
  const [drawState, setDrawState] = useReducer(produce, 'init');
  return (
    <UpdateContext.Provider value={setDrawState}>
      <StateContext.Provider value={ drawState }>
        {props.children}
      </StateContext.Provider>
    </UpdateContext.Provider>
  )
}

export function useDrawState() {
  return [useContext(StateContext), useContext(UpdateContext)]
}