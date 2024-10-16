import styled from 'styled-components';
import AddItens from './Components/addItens/AddItens';
import Table from './Components/Table/Table';
import './styles.css';

const Div = styled.div`
  width: 100%;
  height: 100vh;
  justify-content: center;
`

export default function ItensTable(){
  return (
    <Div >
      <AddItens />
      <Table />
    </Div>
  )
}
