import { createContext, useContext, useState } from "react";
import P from 'prop-types';

export const Context = createContext();

export const DataContainerContext = ({ children, data = {} }) => {

  return <Context.Provider value={data}>{ children }</Context.Provider>
}

DataContainerContext.propTypes = {
  children: P.node,
  data: P.object,
}

export const useDataContainerContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useItensContext must be used within an ItensContextProvider');
  }

  return context;
}
