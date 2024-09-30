/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState, useMemo, useContext } from 'react';
import './App.css';
import { LoadingIcon } from './Components/Loading/LoadingIcon';
import p from 'prop-types'

const globalState = {
  title: 'Título do Contexto',
  body: 'o Body do Contexto',
  counter: 0,
}
const GlobalContext = React.createContext();

// eslint-disable-next-line
const Div = () => {
  return (
    <>
      <Input onChange={handleKeyPressed}/>
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
  return <input type='text' onChange={() => fn()} />
}

const handleKeyPressed = ({text}) => {
  // eslint-disable-next-line
  const theContext = useContext(GlobalContext);
  theContext.setContextState(theContext.globalState.title= {text});
}
// eslint-disable-next-line
const P = () => {
  const theContext = useContext(GlobalContext);
  return <p>{theContext.contextState.body}</p>
}

function App () {
  const [contextState, setContextState] = useState(globalState);
  return (
    <GlobalContext.Provider value={{contextState, setContextState}}>
      <Div />
    </GlobalContext.Provider>
  )
}

export default App;

