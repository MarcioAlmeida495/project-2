import { useEffect, useState } from 'react';
import './styles.css';
import P from 'prop-types';
import Row from './Rows/Row';
import { URLallitens, URLSearchIten } from '../../../../apiURLS';
import { useItensContext } from '../../../../Contexts/ItensContexts';
import { getInit } from '../../usuals';
import RowByFields from './Rows/RowByFields';
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

export default function TableByFields({doFetch = false, filterValue = '', fieldNames = ['id', 'name'], types = ['string', 'string']}){
  const ItensContext = useItensContext();
  const [itens, setItens] = useState([]);
  const [counter, setCounter] = useState(0);

  console.log('FIELDNAMES', fieldNames);
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
               {fieldNames.map((fieldName, index) => {
                return <td key={index}>{fieldName}</td>
               })}
            </tr>
          </thead>
          <tbody>
            {itens.map((value, index)=>{
              console.log('VALUE DENTRO DO MAP', value['name']);
              console.log('FILTER VALUE',filterValue);
              if(value['name'].toUpperCase().includes(filterValue.toUpperCase()) || filterValue === '') return <RowByFields fieldNames={fieldNames} types={types} data={value} key={index} keyValue={index}/>
            })}
          </tbody>
        </table>
      )
  }else{
    return <h1>NOTHING</h1>
  }

}

TableByFields.propTypes = {
  children: P.node,
  fieldsNum: P.number,
  filterValue: P.string,
  fieldName: P.string,
  doFetch: P.bool,
  fieldNames: P.array,
  types: P.array,
}
