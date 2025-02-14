/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const AddItemsContext = createContext();

export const AddItemProvider = ({ children }) => {
    const [AddItemsState, setAddItemsState] = useState(false)
  
    return (
      <AddItemsContext.Provider value={{AddItemsState, setAddItemsState}}>
        {children}
      </AddItemsContext.Provider>
    );
  };