import React, { useEffect, useRef, useState, useMemo, useContext } from 'react';
// import '../App.css';;
import './styles.css';
import '../../App.css';
import p from 'prop-types'
import DataContainer from '../../Components/DataContainer/DataContainer';
import ButtonAddDataContainer from '../../Components/ButtonAddDataContainer/ButtonAddDataContainer';
import ClientsSection from '../../Components/ClientsSection/ClientsSection';
import { AllMyPageProvider } from '../../Contexts/AllMyPageContext';
import { dataFetch } from '../../functions';
import { URLFetchControle } from '../../apiURLS';

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
  const [dataControle, setDataControle] = useState([]);
  const removeDataContainer = (index) => {
    // console.log(datasContainer.map(e => e.key!=index));
    setDatasContainer(datasContainer.filter(e => e.key != index));
    // var arr = datasContainer.splice(index, 1);
    // console.log('DPS DO REMOVE',  arr )
    // setDatasContainer(datasContainer.splice(index, 1));
  }

  const changeName = (event, key) => {
    console.log('CHANGE NAME: ', event.target.value, key);

  }

  const addNewDataContainer = (newSearch = '', type = false) => {
    counter++;
    setDatasContainer([...datasContainer, {links: [], card: <DataContainer onChangeName={changeName} type={type} upAtributes={cardsToUpdate} newSearch={newSearch} key={counter} index={counter}/>, key: counter, name: newSearch}]);
    console.log(datasContainer);
    // console.log('teste');
  }
  const teste = () => {
    // console.log('teste')
  }

  useEffect(()=>{
    setDatasContainer([...datasContainer, {card: <DataContainer upAtributes={cardsToUpdate} index={counter} key={counter}/>, key: counter}]);
    dataFetch(URLFetchControle).then(r => {
      // console.log(r.split('\n'));
      const names = r.split(['\n']);
      const namesFiltered = (names.filter((each) => {if(each.length > 0)return each})).sort();
      console.log(namesFiltered);

      setDataControle(namesFiltered);
    });
  },[])
  console.log(cardsToUpdate);
  return (
    <AllMyPageProvider fns={[datasContainer, setDatasContainer]}>
      <GlobalContext.Provider value={{addNewDataContainer, counter, removeDataContainer, dataControle}}>
        <button onClick={()=>console.log(datasContainer)} >CONSOLE</button>
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


