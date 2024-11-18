import { useEffect, useState } from 'react';
import './styles.css';
import P from 'prop-types';
import Row from './Rows/Row';
import { URLallitens, URLSearchIten } from '../../apiURLS';
import { useItensContext } from '../../Contexts/ItensContexts';
import { getInit } from '../../Templates/ItensTable/usuals';
const datafetch = (URL, init) => new Promise ((resolve, reject)=>{
  fetch(URL, init).then(r=>{
    r.json()
    .then(r=>{
      resolve(r);
    })
  })
})

//     var name = req.body.name;
//     var page = req.body.page;
//     var pglimit = req.body.limit;

export default function Table({doFetch = false, fieldsNum = 6, filterValue = '', fieldName = 'name'}){
  const ItensContext = useItensContext();
  const [itens, setItens] = useState([]);
  const [counter, setCounter] = useState(0);
  // console.log('TABLERENDERIZOU');
  // useEffect(()=>{
  //   console.log('DOFETCH', doFetch);
  //   // console.log()
  //   getInit({name: filterValue, page:1, limit: 10}).then(r=>{
  //     var init = r;
  //     console.log(r);
  //     datafetch(URLSearchIten, init).then(r=>{
  //       console.log(r);
  //     })
  //   });

  // },[doFetch])

  useEffect(()=>{
    setCounter(counter+1);
    fetch(URLallitens).then(r=>{
      r.json().then(r=>{
        // console.log(r);
        setItens(r);
        setCounter(counter+1);
      })
    })
    return () => {
      // console.log('unMOUNT');
    }
  }, [ItensContext.counter]);

  useEffect(()=>{
    getInit({name: filterValue}).then(r=>{
      var init = r;
      console.log(r);
      datafetch(URLSearchIten, init).then(r=>{
        console.log(r);
        setItens(r);
        setCounter(counter+1);
      })
    });
    // fetch(URLallitens).then(r=>{
    //   r.json().then(r=>{
    //     // console.log(r);
    //     setItens(r);
    //     setCounter(counter+1);
    //   })
    // })
    return () => {
      // console.log('unMOUNT');
    }
  },[]);
  // itens && console.log('ITENSATT', itens[0]);

  useEffect(()=>{
    setCounter(counter+1);
    // console.log('COUNTER', counter, 'ITENS', itens);
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
              // console.log('INDEXTABLE', iten.name);
              // console.log("INDEXTABLE", iten[fieldName]);
              if(filterValue === '' || iten[fieldName].toUpperCase().includes(filterValue.toUpperCase())) return <Row key={index} keyValue={index} data={iten} fieldsNum={fieldsNum}/>
              else return null
              // return <Row key={index} keyValue={index} data={iten} fieldsNum={fieldsNum}/>
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
  filterValue: P.string,
  fieldName: P.string,
  doFetch: P.bool,
}
