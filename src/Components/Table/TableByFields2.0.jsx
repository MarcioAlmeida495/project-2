import { useEffect, useState } from 'react';
import './styles.css';
import P from 'prop-types';
import Row from './Rows/Row';
import { URLallitens, URLSearchIten } from '../../apiURLS';
import { useItensContext } from '../../Contexts/ItensContexts';
import RowByFields from './Rows/RowByFields';






var originFields = [];
export default function TableByFields({ dataItens = [], filterValue = '', fieldNames = ['id', 'name'], types = ['string', 'string']}){
  const ItensContext = useItensContext();
  const [itens, setItens] = useState(dataItens);
  const [counter, setCounter] = useState(0);
  const [sortByField, setSortByField] = useState();
  useEffect(()=>{
    var object = {};
    for(var i = 0; i < fieldNames.length; i++){
      object[fieldNames[i]] = true;
    }
    console.log('OBJECT', object);
    originFields = object;
    setSortByField(object);
  }, [fieldNames])

  useEffect(()=>{
    setItens(dataItens.reverse());
  }, [dataItens]);
  const handleTdOnClick = (fieldName) => {
    setSortByField({...originFields,  [fieldName]: !sortByField[fieldName] })
    var itensSort;
    try {
      isNaN(itens[0][fieldName])
        ?
        itensSort = itens.sort((a, b) => a[fieldName].toUpperCase().localeCompare(b[fieldName].toUpperCase()))
        :
        itensSort = itens.sort((a, b) => a[fieldName] - b[fieldName]);

      if(sortByField[fieldName] === false) {
        console.log('dentro do IFF')
        itensSort = itens.reverse();
      }

      setItens(itensSort);
      setCounter(counter+1);

    } catch (error) {
      console.log(error)
    }
    console.log('SORTBYFIELD', typeof itens[0][fieldName]);
  }

  // useEffect(()=>{
  //   setCounter(counter+1);
  //   fetch(URLallitens).then(r=>{
  //     r.json().then(r=>{
  //       setItens(r.reverse());
  //       setCounter(counter+1);
  //     })
  //   })
  //   return () => {
  //   }
  // }, [ItensContext.counter]);

  useEffect(()=>{
    console.log(sortByField);
  }, [sortByField])

  useEffect(()=>{
    setCounter(counter+1);

  }, [itens]);

  if(itens.length > 0){
    return (
        <table>
          <thead>
            <tr>
               {fieldNames.map((fieldName, index) => {
                return <>
                <td key={`tbthtrtd${index}`}
                  onClick={
                  ()=>{
                    handleTdOnClick(fieldName)
                  }
                  }
                  >
                    {fieldName}
                </td></>
               })}
            </tr>
          </thead>
          <tbody>
            {itens.map((value, index)=>{
              if(value['name'].toUpperCase().includes(filterValue.toUpperCase()) || filterValue === '')
                return <RowByFields fieldNames={fieldNames} types={types} data={value} key={index} keyValue={index}/>
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
  sortField: P.string,
  dataItens: P.array,
}
