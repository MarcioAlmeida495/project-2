import styled from 'styled-components';
import ButtonAddIten from './Components/addItens/ButtonAddIten';
import Table from './Components/Table/Table';
import { useState } from 'react';
import { ItensContextProvider } from '../../Contexts/ItensContexts';
// import './styles.css';

const Div = styled.div`
  width: 100%;
  height: 100vh;
  justify-content: center;
`

export default function ItensTable(){
  const [counterReset, setCounterReset] = useState(0);
  const handleIncrementCounter = () => {
    console.log('KADEEEE CARALEOOOO',counterReset);
    setCounterReset(counterReset+1);
  }
  return (
    <ItensContextProvider>
      <Div >
        <ButtonAddIten handleIncrementCounter={handleIncrementCounter}/>
        <Table />
      </Div>
    </ItensContextProvider>
  )
}
