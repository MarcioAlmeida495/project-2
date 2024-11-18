import { createContext, useState, useContext } from "react"
import P from 'prop-types';

export const AddItensContext = () => {

}

export const Context = createContext();

export const AddItensProvider = ({children}) => {
  const [addItensButtons, setAddItensButtons] = useState([]);
  return <Context.Provider value={{addItensButtons, setAddItensButtons}}>
    {children}
  </Context.Provider>
}

AddItensProvider.propTypes = {
  children: P.node,
}

export const useAddItensContext = () => {
  const context  = useContext(Context);
  return context;
}
