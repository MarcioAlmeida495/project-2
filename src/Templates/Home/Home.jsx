import React, { useEffect, useRef, useState, useMemo, useContext } from 'react';
// import '../App.css';;
import './styles.css';
import '../../App.css';
import p from 'prop-types'
import DataContainer from '../../Components/DataContainer/DataContainer';
import ButtonAddDataContainer from '../../Components/ButtonAddDataContainer/ButtonAddDataContainer';
import ClientsSection from '../../Components/ClientsSection/ClientsSection';
import { AllMyPageProvider } from '../../Contexts/AllMyPageContext';

var counter = 0;

const globalState = {
  title: 'Título do Contexto',
  body: 'o Body do Contexto',
  counter: 0,
  value:'',
}

var cardsToUpdate = [];

export const GlobalContext = React.createContext();

export default function Home () {
  const [datasContainer, setDatasContainer] = useState([]);

  const removeDataContainer = (index) => {
    console.log(datasContainer.map(e => e.key!=index));
    setDatasContainer(datasContainer.map(e => e.key!=index && e));
  }
  const addNewDataContainer = (newSearch = '') => {
    counter++;
    setDatasContainer([...datasContainer, {card: <DataContainer upAtributes={cardsToUpdate} newSearch={newSearch} key={counter} index={counter}/>, key: counter}]);
    console.log(datasContainer);
    //console.log('teste');
  }
  const teste = () => {
    //console.log('teste')
  }

  useEffect(()=>{
    setDatasContainer([...datasContainer, {card: <DataContainer upAtributes={cardsToUpdate} index={counter} key={counter}/>, key: counter}]);
  },[])
  console.log(cardsToUpdate);
  return (
    <AllMyPageProvider fns={[datasContainer, setDatasContainer]}>
      <GlobalContext.Provider value={{addNewDataContainer, counter, removeDataContainer}}>
        <div className='pageBody'>
          <ClientsSection />
          <div className='content'>

            {datasContainer.map((data) => data.card)}
            <ButtonAddDataContainer AddDataContainer={addNewDataContainer}/>
          </div>
        </div>
      </GlobalContext.Provider>
    </AllMyPageProvider>
  )
}


