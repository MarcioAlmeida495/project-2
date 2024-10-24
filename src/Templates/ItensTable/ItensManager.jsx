import styled from 'styled-components';
import ButtonAddIten from './Components/addItens/ButtonAddIten';
import Table from './Components/Table/Table';
import { useEffect, useState } from 'react';
import { ItensContextProvider } from '../../Contexts/ItensContexts';
import InputSearch from '../../Components/Inputs/InputSearch/InputSearch';
import TableByFields from './Components/Table/TableByFields';
// import './styles.css';

const Div = styled.div`
  width: 100%;
  height: 100vh;
  justify-content: center;
`

export default function ItensTable(){
  const [counterReset, setCounterReset] = useState(0);
  const [valueSearch, setValueSearch] = useState('');
  const [doFetch, setDoFetch] = useState(false);
  const handleIncrementCounter = () => {
    console.log('KADEEEE CARALEOOOO',counterReset);
    setCounterReset(counterReset+1);
  }
  const handleKeyUp = (event, value) => {
    if(event.key === 'Enter'){
      // setValueSearch(value);
      // console.log('valueSearch', valueSearch);
      setDoFetch(true);
    }
    setValueSearch(value);
  }

  useEffect(()=>{
    setDoFetch(false);
  },[doFetch])
  return (
    <ItensContextProvider>
      <Div >
        <ButtonAddIten handleIncrementCounter={handleIncrementCounter}/>
        <InputSearch onKeyUp={handleKeyUp} />
        <TableByFields fieldNames={['id', 'name', 'valorV', 'valorC', 'quantidade']} types={['', '', 'number', 'number', '']} filterValue={valueSearch} doFetch={doFetch} />
      </Div>
    </ItensContextProvider>
  )
}
