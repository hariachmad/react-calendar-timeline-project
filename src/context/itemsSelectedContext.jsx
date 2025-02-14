/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const ItemsSelectedContext = createContext();

export const ItemsSelectedProvider = ({ children }) => {
    const [itemsSelectedState, setItemsSelectedState] = useState(true)
  
    return (
      <ItemsSelectedContext.Provider value={{itemsSelectedState, setItemsSelectedState}}>
        {children}
      </ItemsSelectedContext.Provider>
    );
  };