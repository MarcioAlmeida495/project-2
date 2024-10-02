import React, { useEffect, useRef, useState, useMemo, useContext } from 'react';
import './App.css';
import { LoadingIcon } from './Components/Loading/LoadingIcon';
import p from 'prop-types'
import DataContainer from './Components/DataContainer/DataContainer';
import InputSearch from './Components/Inputs/InputSearch';

const globalState = {
  title: 'Título do Contexto',
  body: 'o Body do Contexto',
  counter: 0,
  value:'',
}
const GlobalContext = React.createContext();

// eslint-disable-next-line
const Div = () => {
  return (
    <>
      <Input/>
      <H1 />
      <P />
    </>
  )
}
// eslint-disable-next-line
const H1 = () => {
  const theContext = useContext(GlobalContext);
  return <h1>{theContext.contextState.title}</h1>
}



// eslint-disable-next-line
const Input = ({fn}) => {
  const theContext = useContext(GlobalContext);
  return <input type='text' value={theContext.contextState.title} onChange={() => fn(text)} />
}

// eslint-disable-next-line
const P = () => {
  const theContext = useContext(GlobalContext);
  return <p>{theContext.contextState.body}</p>
}



function App () {
  const [contextState, setContextState] = useState(globalState);
  const [value, setValue] = useState("Marcio Almeida");

  const handleKeyUp = (e, value) => {
    if(e.key === 'Enter') {
      setValue(value);
    }

  };

  return (
    <GlobalContext.Provider value={{contextState, setContextState}}>
      <div className='pageBody'>
        <div className='content'>
          <InputSearch onKeyUp={handleKeyUp}/>
          <DataContainer search={value} />
        </div>
      </div>
    </GlobalContext.Provider>
  )
}

export default App;

