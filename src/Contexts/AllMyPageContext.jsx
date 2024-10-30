import { createContext, useContext, useState } from "react";
import P from 'prop-types';

export const Context = createContext();

export const AllMyPageProvider = ({ children, fns = [] }) => {
  const [links, setLinks] = useState([]);
  const [myfns, setmyfns] = useState(fns);
  return <Context.Provider value={{fns: myfns, setFns: setmyfns, links: links, setLinks: setLinks}}>{ children }</Context.Provider>
}

AllMyPageProvider.propTypes = {
  children: P.node,
  fns: P.array,
}

export const useAllMyPageContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useItensContext must be used within an ItensContextProvider');
  }

  return context;
}
