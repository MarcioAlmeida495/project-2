import { useEffect, useReducer, useRef, useState } from 'react';
import './styles.css';
import P from 'prop-types';
import {SimpleInput} from '../../../../../Components/Inputs/SimpleImput/SimpleInput';
import {EditIten} from '../../EditIten/EditIten';
const prefixClass = (key) => `trRow[${key}]`;
const prefixClassInput = (key) => `data${prefixClass(key)}`;
export default function RowByFields({data = {}, fieldNames = ['id', 'name'], types = ['string', 'string'], keyValue = 0}){
  const [dataValue, setDataValue] = useState({});
  const [fields, setFields] = useState([]);
  const [fieldsValues, setFieldsValues] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const trRef = useRef(null);
  const [editValues, setEditValues] = useState({});
  // console.log('RENDERIZOU FILHO');
  console.log('DATA', data);
  // console.log('INDEX', keyValue);


  const getValuesFromRow = (rowNum) => {
    var rowData = document.getElementsByClassName(prefixClassInput(rowNum));
    var rowDataArr = [...rowData];
    var dataObject = {};
    fieldNames.map((field, index)=>{
      dataObject[field] = rowDataArr[index].value;
    })
    console.log(dataObject);
    // console.log('ROWDATA!!->',rowData);
    // console.log('ELEMENTO PAI', childrenArr);
  }

  const handleClick = (rowNum) => {

    setIsEditing((isEditing) => {
        if(isEditing) {
          console.log('lala');
          getValuesFromRow(rowNum);
        }
      return !isEditing

    });



  }

  const handleChangeEvent = (value) => {
    // setFieldsValues();
    console.log('FIELDVALYESSSS',fieldsValues);
  }
  useEffect(() => {
    if (data) {
      console.log('Data received:', data);
      setDataValue(data);
      setFields(Object.keys(data));
      setFieldsValues(Object.values(data));
    }
  }, [data]); // O useEffect agora depende diretamente de "data"


  if(!data || Object.keys(data).length === 0){
    return <h1>Nenhum dado</h1>
  }

  return (
    <tr ref={trRef} id={prefixClass(keyValue)} >
      {fieldNames.map((fieldName, index)=>{
        // console.log(data);
        // console.log(fieldName)
        // console.log(data[fieldName]);
        return (
          // isEditing ? <td  key={index}><input type='text' onChange={()=>{}} value={data[fieldName]}/></td> : <td key={index}>{(types[index] === 'number' ? parseFloat(data[fieldName]).toFixed(2) : data[fieldName])}</td>


          <td key={prefixClass(index)} >
            {isEditing ? <SimpleInput className={prefixClassInput(keyValue)} type='text' upValue={data[fieldName].toString()} /> : (types[index] === 'number' ? parseFloat(data[fieldName]).toFixed(2) : data[fieldName]) }
          </td>
        )
      }
      )}
      <td>
        { isEditing ?
          <>
            <button onClick={() => handleClick(keyValue)} className='checkAction' >Salvar</button>
            <button className='checkAction' >Cancelar</button>
          </>
        :
          <>
            <button onClick={() => handleClick(keyValue)} className='checkAction' >Editar</button>
            <button className='checkAction' >Deletar</button>
          </>
        }
      </td>
    </tr>
  )
}

RowByFields.propTypes = {
  data: P.object,
  fieldsNum: P.number,
  keyValue: P.number,
  fieldNames: P.array,
  types: P.array,
};


// import { useEffect, useState } from 'react';
// import './styles.css';
// import P from 'prop-types';

// export default function Row({data = {}}) {
//   const [dataValue, setDataValue] = useState({});
//   const [fields, setFields] = useState([]);
//   const [fieldsValues, setFieldsValues] = useState([]);

//   useEffect(() => {
//     if (data) {
//       console.log('Data received:', data);
//       setDataValue(data);
//       setFields(Object.keys(data));
//       setFieldsValues(Object.values(data));
//     }
//   }, [data]); // O useEffect agora depende diretamente de "data"

//   // Se não houver dados, retorna a mensagem de "Nenhum dado"
  // if (!data || Object.keys(data).length === 0) {
  //   return <h1>Nenhum dado</h1>;
  // }

//   return (
//     <table>
//       <thead>
//         <tr>
//           {fields.map((field, index) => (
//             <th key={index}>{field}</th> // Use "map" ao invés de "forEach"
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           {fieldsValues.map((value, index) => (
//             <td key={index}>
//               {typeof value === 'object' ? JSON.stringify(value) : value}
//             </td>
//           ))}
//         </tr>
//       </tbody>
//     </table>
//   );
// }

// Row.propTypes = {
//   data: P.object,
// };
