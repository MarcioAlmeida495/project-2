import { createContext, useContext, useState } from "react";
import P from 'prop-types';

export const Context = createContext();

export const ClientsSectionContext = ({ children, data = {} }) => {
  const [incrementData, setIncrementData] = useState({})
  return <Context.Provider value={{...data, incrementData, setIncrementData}}>{ children }</Context.Provider>
}

ClientsSectionContext.propTypes = {
  children: P.node,
  data: P.object,
}

export const useClientsSectionContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useClientsSection must be used within an ClientsSectionProvider');
  }

  return context;
}
