import { useEffect, useReducer, useRef, useState } from 'react';
import './styles.css';
import P from 'prop-types';
import {SimpleInput} from '../../Inputs/SimpleImput/SimpleInput';
// import { SimpleInput } from '../../Inputs/SimpleImput/SimpleInput';
import {EditIten} from '../../EditIten/EditIten';
import { formatDataInit, dataFetch } from '../../../functions';
import { useItensContext } from '../../../Contexts/ItensContexts';
import { URLUpdateIten, URLDeleteIten } from '../../../apiURLS';
// import { URLUpdateIten } from '../../apiURLS';
import { StyledRow } from './styledRow';
const prefixClass = (key) => `trRow[${key}]`;
const prefixClassInput = (key) => `data${prefixClass(key)}`;
var Tr = StyledRow();

export default function RowByFields({functions = {},data = {}, fieldNames = ['id', 'name'], types = ['string', 'string'], keyValue = 0}){
  // var Tr[rowNum] = StyledRow();
  const ItensContext = useItensContext();
  const [dataValue, setDataValue] = useState({});
  const [fields, setFields] = useState([]);
  const [fieldsValues, setFieldsValues] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const trRef = useRef(null);
  const [color, setColor] = useState('555791');
  const [editValues, setEditValues] = useState({});
  // console.log('RENDERIZOU FILHO');
  // console.log('DATA', dataValue);
  // console.log('INDEX', keyValue);
  // Tr = StyledRow(color)

  const UpdateComponent = () => {
    ItensContext.setCounter(ItensContext.counter + 1);
  }
  const getValuesFromRowInput = (rowNum) => {

      var rowData = document.getElementsByClassName(prefixClassInput(rowNum));
      var rowDataArr = [...rowData];
      var dataObject = {};
      fieldNames.map((field, index)=>{
          dataObject[field] = rowDataArr[index].value;
      })
      // data = dataObject;
      // console.log(dataObject);
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
    // console.log(dataObject);
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
          // console.log('lala');
          var initBody =  {...getValuesFromRowInput(rowNum), categoria: '1'};
          // setDataValue({...getValuesFromRowInput(rowNum), categoria: '1'});
          // console.log({...getValuesFromRowInput(rowNum), categoria: '1'});
          var init = formatDataInit(initBody);
          dataFetch(URLUpdateIten, init)
            .then(r=>
              UpdateComponent()
              // setDataValue(r[0])
            );
          ItensContext.setCounter(ItensContext.counter + 1);
          // console.log('INIT --> ',formatDataInit(initBody));

          // console.log('trocou');
        }
      return !isEditing;
    });
  }
  const handleClickDelete = (rowNum) => {
    const values = getValuesFromRowTd(rowNum);
    const entries = Object.entries(values)
    console.log(entries);
    const init = formatDataInit(values);
    console.log('init', init);
    dataFetch(URLDeleteIten, init)
    .then(r=>{
      console.log(r);
      UpdateComponent();}
    );
    console.log(values)
  }
  const handleChangeEvent = (value) => {
    // setFieldsValues();
    // console.log('FIELDVALYESSSS',fieldsValues);
  }
  useEffect(() => {
    if (data) {
      // console.log('Data received:', data);
      setDataValue(data);
      setFields(Object.keys(data));
      setFieldsValues(Object.values(data));
    }
  }, [data]); // O useEffect agora depende diretamente de "data"


  if(!data || Object.keys(data).length === 0){
    return <h1>Nenhum dado</h1>
  }
  if(data)
  return (
<>
    <Tr ref={trRef} id={prefixClass(keyValue)} >
      {fieldNames.map((fieldName, index)=>{
        // console.log(data);
        // console.log(fieldName)
        // console.log(data[fieldName]);
        return (
          // isEditing ? <td  key={index}><input type='text' onChange={()=>{}} value={data[fieldName]}/></td> : <td key={index}>{(types[index] === 'number' ? parseFloat(data[fieldName]).toFixed(2) : data[fieldName])}</td>


          <td key={prefixClass(index)} className={prefixClass(keyValue)} >
            {isEditing ?
            <SimpleInput
              enterOn={false}
              className={prefixClassInput(keyValue)}
              onKeyUp={(event) => {if(event.key ==='Enter'){handleClickEdit(keyValue)}}}
              type='text'
              upValue={dataValue[fieldName].toString()}
            />
            :
            (types[index] === 'number' ?
              parseFloat(dataValue[fieldName]).toFixed(2)
              :
              dataValue[fieldName]) }
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
    </Tr>
        {/* <input type="color" id="colorPicker" value={color} onChange={(event)=>{setColor(event.target.value)}}></input>*/}</>
  )
}

RowByFields.propTypes = {
  data: P.object,
  fieldsNum: P.number,
  keyValue: P.number,
  fieldNames: P.array,
  types: P.array,
  functions: P.object,
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
      // console.log('Data received:', data);
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
