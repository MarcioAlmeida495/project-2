import React, { useEffect, useRef, useState, useMemo, useContext } from 'react';
// import '../App.css';;
import './styles.css';
import '../../App.css';
import P from 'prop-types'
import DataContainer from '../../Components/DataContainer/DataContainer';
import ButtonAddDataContainer from '../../Components/ButtonAddDataContainer/ButtonAddDataContainer';
import ClientsSection from '../../Components/ClientsSection/ClientsSection';
import { AllMyPageProvider } from '../../Contexts/AllMyPageContext';
import { dataFetch } from '../../functions';
import { URLFetchControle } from '../../apiURLS';
import { DataContainerContext, useDataContainerContext } from '../../Contexts/DataContainerContext';

var counter = 0;

const globalState = {
  title: 'Título do Contexto',
  body: 'o Body do Contexto',
  counter: 0,
  value:'',
}

var cardsToUpdate = [];

export const GlobalContext = React.createContext();

export default function Home ({onUnMount = ()=>{}}) {
  const [datasContainer, setDatasContainer] = useState([]);
  const [dataControle, setDataControle] = useState([]);
  const HomeRef = useRef();
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

  useEffect(()=>{

    var containers = [...datasContainer];
    // if(containers.length > 1)console.log('CARD', containers[containers.length-1]['card'].props);
    for(var i=0; i<containers.length; i++){
      console.log(containers[i]['card']);
    }

  }, [datasContainer])

  useEffect(()=>{
    return () => {
      // console.log('ONUNMOUNT -- >> ', React.cloneElement(Home))
      // onUnMount(React.cloneElement(HomeRef));
    }
  },[])
  const addNewDataContainer = (newSearch = '', type = false) => {
    counter++;
    var containers = [...datasContainer];
    setDatasContainer([...datasContainer, {links: [], card: <DataContainer changeClass='' onChangeName={changeName} type={type} upAtributes={cardsToUpdate} newSearch={newSearch} key={counter} index={counter}/>, key: counter, name: newSearch}]);
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
    <div ref={HomeRef} >
    <DataContainerContext >
      <AllMyPageProvider fns={[datasContainer, setDatasContainer]}>
        <GlobalContext.Provider value={{addNewDataContainer, counter, removeDataContainer, dataControle}}>
          {/* <button onClick={()=>console.log(datasContainer)} >CONSOLE</button> */}
          <div className='pageBody'>
            <ClientsSection />
            <div className='content'>
              {datasContainer.map((data) => data.card)}
              <ButtonAddDataContainer AddDataContainer={addNewDataContainer}/>
            </div>
          </div>
        </GlobalContext.Provider>
      </AllMyPageProvider>

    </DataContainerContext>
    </div>
  )
}

Home.propTypes = {
  onUnMount: P.func,
}

