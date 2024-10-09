import React, { useEffect, useRef, useState, useMemo, useContext } from 'react';
import './App.css';
import { LoadingIcon } from './Components/Loading/LoadingIcon';
import p from 'prop-types'
import DataContainer from './Components/DataContainer/DataContainer';
import InputSearch from './Components/Inputs/InputSearch';
import ButtonAddDataContainer from './Components/ButtonAddDataContainer/ButtonAddDataContainer';
import ClientsSection from './Components/ClientsSection/ClientsSection';
import { ButtonMenu } from './Components/Button/ButtonMenu';

const globalState = {
  title: 'Título do Contexto',
  body: 'o Body do Contexto',
  counter: 0,
  value:'',
}
const GlobalContext = React.createContext();

const dataModel = {
  dataComponent: <DataContainer/>,
  id: 0,
}

function App () {
  const [contextState, setContextState] = useState(globalState);
  const [datasContainer, setDatasContainer] = useState([<DataContainer key={0}/>]);

  const addNewDataContainer = () => {
    setDatasContainer([...datasContainer, <DataContainer key={datasContainer.length}/>]);
    console.log(datasContainer);
    console.log('teste');
  }

  const teste = () => {
    console.log('teste')
  }

  return (
    <GlobalContext.Provider value={{contextState, setContextState}}>

      <div className='pageBody'>
        <ClientsSection />
        <div className='content'>
          {datasContainer.map((data) => data)}
          <ButtonAddDataContainer AddDataContainer={addNewDataContainer}/>
        </div>
      </div>
    </GlobalContext.Provider>
  )
}

export default App;

