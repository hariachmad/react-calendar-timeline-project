/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
    const [scrollState, setScrollState] = useState(true)
  
    return (
      <ScrollContext.Provider value={{scrollState, setScrollState}}>
        {children}
      </ScrollContext.Provider>
    );
  };