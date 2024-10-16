import { useEffect, useState } from 'react';
import './styles.css';
import P from 'prop-types';
import { URLallitens } from '../../apiURLS';
import Row from './Rows/Row';
import TableGPT from './TableGPT';

const datafetch = new Promise (()=>{
  fetch(URLallitens).then(r=>{
    r.json()
  }).then(r=>{
    console.log(r);
  })
})


export default function Table(){
  const [itens, setItens] = useState([]);
  const [counter, setCounter] = useState(0);
  console.log('TABLERENDERIZOU');

  useEffect(()=>{
    fetch(URLallitens).then(r=>{
      r.json().then(r=>{
        console.log(r);
        setItens(r);
        setCounter(counter+1);
      })
    })
    return () => {
      console.log('unMOUNT');
    }
  },[]);
  itens && console.log('ITENSATT', itens[0]);

  useEffect(()=>{
    setCounter(counter+1);
    console.log('COUNTER', counter, 'ITENS', itens);
  }, [itens]);

  if(itens){
    return (
        <table>
          <thead>
          </thead>
          {/* {itens && itens.map(iten => <h3 key={iten.id} >{iten.id} : {iten.name} : {parseFloat(iten.valorV).toFixed(2)}</h3>)} */}
          <h1>{counter}</h1>
          {itens.length > 0 && itens.map((iten, index) => {
            console.log('iten', iten);
            return <Row key={index} data={iten} fieldsNum={6}/>
          })}
          {/* <TableGPT data={itens}/> */}
        </table>
      )
  }else{
    return <h1>NOTHING</h1>
  }

}

Table.propTypes = {
  children: P.node,
}
