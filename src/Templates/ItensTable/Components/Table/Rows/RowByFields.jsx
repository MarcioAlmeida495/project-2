import { useEffect, useReducer, useRef, useState } from 'react';
import './styles.css';
import P from 'prop-types';
import {SimpleInput} from '../../../../../Components/Inputs/SimpleImput/SimpleInput';
import {EditIten} from '../../EditIten/EditIten';
import { formatDataInit, dataFetch } from '../../../../../functions';
import { URLUpdateIten } from '../../../../../apiURLS';
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
  // console.log('DATA', dataValue);
  // console.log('INDEX', keyValue);


  const getValuesFromRowInput = (rowNum) => {

      var rowData = document.getElementsByClassName(prefixClassInput(rowNum));
      var rowDataArr = [...rowData];
      var dataObject = {};
      fieldNames.map((field, index)=>{
          dataObject[field] = rowDataArr[index].value;
      })
      // data = dataObject;
      console.log(dataObject);
      return dataObject;

    // console.log('ROWDATA!!->',rowData);
    // console.log('ELEMENTO PAI', childrenArr);
  }

  const getValuesFromRowTd = (rowNum) => {
    var rowData = document.getElementsByClassName(prefixClass(rowNum));
    var rowDataArr = [...rowData];
    var dataObject = {};
    fieldNames.map((field, index)=>{
        dataObject[field] = rowDataArr[index].innerHTML;
    })
    // data = dataObject;
    console.log(dataObject);
    return dataObject;
  }
  const handleClickCancel = () => {
    setIsEditing((isEditing) => {
    return !isEditing;
  });
  }
  const handleClickEdit = (rowNum) => {
    setIsEditing((isEditing) => {
        if(isEditing) {
          console.log('lala');
          var initBody =  {...getValuesFromRowInput(rowNum), categoria: '1'};
          // setDataValue({...getValuesFromRowInput(rowNum), categoria: '1'});
          console.log({...getValuesFromRowInput(rowNum), categoria: '1'});
          var init = formatDataInit(initBody);
          dataFetch(URLUpdateIten, init).then(r=> setDataValue(r[0]));
          // console.log('INIT --> ',formatDataInit(initBody));

          console.log('trocou');
        }
      return !isEditing;
    });
  }
  const handleClickDelete = (rowNum) => {
    console.log(getValuesFromRowTd(rowNum));
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


          <td key={prefixClass(index)} className={prefixClass(keyValue)} >
            {isEditing ? <SimpleInput className={prefixClassInput(keyValue)} type='text' upValue={dataValue[fieldName].toString()} /> : (types[index] === 'number' ? parseFloat(dataValue[fieldName]).toFixed(2) : dataValue[fieldName]) }
          </td>
        )
      }
      )}
      <td>
        { isEditing ?
          <>
            <button onClick={() => handleClickEdit(keyValue)} className='checkAction' >Salvar</button>
            <button onClick={() => handleClickCancel(keyValue)} className='checkAction' >Cancelar</button>
          </>
        :
          <>
            <button onClick={() => handleClickEdit(keyValue)} className='checkAction' >Editar</button>
            <button onClick={() => handleClickDelete(keyValue)} className='checkAction' >Deletar</button>
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
