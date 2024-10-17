import { useEffect, useState } from 'react';
import './styles.css';
import P from 'prop-types';
import Row from './Rows/Row';
import { URLallitens } from '../../../../apiURLS';

const datafetch = new Promise (()=>{
  fetch(URLallitens).then(r=>{
    r.json()
  }).then(r=>{
    console.log(r);
  })
})


export default function Table({fieldsNum = 6}){
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

  if(itens.length > 0){
    return (
        <table>
          <thead>
            <tr>
              {Object.keys(itens[0]).map((value, index)=>{
                if(index<fieldsNum) return <th key={`theadtdtr${value}`} >{value}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {/* {itens && itens.map(iten => <h3 key={iten.id} >{iten.id} : {iten.name} : {parseFloat(iten.valorV).toFixed(2)}</h3>)} */}

            {itens.length > 0 && itens.map((iten, index) => {
              console.log('INDEXTABLE', index);
              return <Row key={index} keyValue={index} data={iten} fieldsNum={fieldsNum}/>
            })}
            {/* <TableGPT data={itens}/> */}
          </tbody>
        </table>
      )
  }else{
    return <h1>NOTHING</h1>
  }

}

Table.propTypes = {
  children: P.node,
  fieldsNum: P.number,
}
