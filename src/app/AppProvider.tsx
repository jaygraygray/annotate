// @ts-nocheck
import React, { createContext } from 'react';
import {
  state,
} from './lib/store';


type ValueProps = {
  isTrue: boolean;
}

export const AppContext = createContext<Partial<ValueProps>>(null);

// build handlers for shapes

export const AppProvider: React.FC = (props) => {
  return (
    <AppContext.Provider value={{
      state,
      //handlers
    }}>
      {props.children}
    </AppContext.Provider>
  )
}