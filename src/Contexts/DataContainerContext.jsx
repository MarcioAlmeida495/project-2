import { createContext, useContext, useEffect, useState } from "react";
import P from 'prop-types';
import { InputSearch } from '../Components/Inputs/InputSearch/InputSearch.jsx';

export const Context = createContext();

export const DataContainerContext = ({ children, data = {} }) => {
  const [incrementData, setIncrementData] = useState([])
  const [links, setLinks] = useState([]);

  useEffect(()=>{
    console.log(links);
  }, [links]);

  function getLinks (){
    return links;
  }

  return <Context.Provider value={{...data, incrementData, setIncrementData, children, getLinks, setLinks}}>
    { children }
    </Context.Provider>
}

DataContainerContext.propTypes = {
  children: P.node,
  data: P.object,
  links: P.array,
}

export const useDataContainerContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useItensContext must be used within an ItensContextProvider');
  }

  return context;
}
