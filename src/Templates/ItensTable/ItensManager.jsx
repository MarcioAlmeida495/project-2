import styled from 'styled-components';
import ButtonAddIten from '../../Components/addItens/ButtonAddIten';
import { useEffect, useState } from 'react';
import { ItensContextProvider } from '../../Contexts/ItensContexts';
import InputSearch from '../../Components/Inputs/InputSearch/InputSearch';
import TableByFields from '../../Components/Table/TableByFields2.0';
import { URLallitens, URLSearchIten } from '../../apiURLS';
import { dataFetch, formatDataInit } from '../../functions';
import { useItensContext } from '../../Contexts/ItensContexts';
// import './styles.css';



const itensInfo = (data) => {
  return {
  'id': {'value': data['id'],'editable' : false, 'name' : 'id', 'type' : 'string'},
  'name': {'value': data['name'], 'editable' : true, 'name' : 'name', 'type' : 'string'},
  'valorV': {'value': data['valorV'],'editable' : true, 'name' : 'Valor de Venda', 'type' : 'float'},
  'valorC' : {'value': data['valorC'],'editable' : true, 'name' : 'Valor de Compra', 'type' : 'float'},
  'qtd' : {'value': data['qtd'],'editable' : true, 'name' : 'quantidade', 'type' : 'float'},
  'category' : {'value': data['category']['title'],'editable' : true, 'name' : 'quantidade', 'type' : 'float'},
  }
}

const Div = styled.div`
  width: 100%;
  height: 100vh;
  justify-content: center;
`
const dataInit = formatDataInit('');

export default function ItensTable(){
  const [counterReset, setCounterReset] = useState(0);
  const [valueSearch, setValueSearch] = useState('');
  const [doFetch, setDoFetch] = useState(false);
  const [dataItens, setDataItens] = useState([]);
  const ItensContext = useItensContext();
  useEffect(()=>{
    dataFetch(URLallitens).then(r=>{
      // console.log('SAIDA DO DATAFETCH', r);
      console.log(itensInfo(r[0]));
      console.log(r[0])
      setDataItens(r);
    });

  }, [])

  useEffect(()=>{
    dataFetch(URLallitens).then(r=>{
      setDataItens(r);
      console.log('FEITO O FETCH');
    });
  },[ItensContext.counter]);

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

      <Div >
        <ButtonAddIten handleIncrementCounter={handleIncrementCounter}/>
        <InputSearch onKeyUp={handleKeyUp} />
        <TableByFields dataItens={dataItens} itensInfo={itensInfo} fieldNames={['id', 'name', 'valorV', 'valorC', 'quantidade']} types={['', '', 'number', 'number', '']} filterValue={valueSearch} doFetch={doFetch} />
      </Div>
  )
}
