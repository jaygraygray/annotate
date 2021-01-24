import React, { createContext } from 'react'

type ValueProps = {
  isTrue: boolean;
}

export const AppContext = createContext<Partial<ValueProps>>(null);

// build handlers for shapes

export const AppProvider: React.FC = (props) => {
  return (
    <AppContext.Provider value={{
      isTrue: true
    }}>
      {props.children}
    </AppContext.Provider>
  )
}