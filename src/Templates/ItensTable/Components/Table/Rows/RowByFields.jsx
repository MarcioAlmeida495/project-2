import { useEffect, useReducer, useRef, useState } from 'react';
import './styles.css';
import P from 'prop-types';
import {SimpleInput} from '../../../../../Components/Inputs/SimpleImput/SimpleInput';

const prefixClass = (key) => `trRow[${key}]`;


export default function RowByFields({data = {}, fieldNames = ['id', 'name'], keyValue = 0}){
  const [dataValue, setDataValue] = useState({});
  const [fields, setFields] = useState([]);
  const [fieldsValues, setFieldsValues] = useState([]);
  const [editOn, setEditOn] = useState(false);
  const trRef = useRef(null);
  // console.log('RENDERIZOU FILHO');
  console.log('DATA', data);
  // console.log('INDEX', keyValue);

  const handleClick = (event) => {
    setEditOn(!editOn);

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
    <tr ref={trRef} className={prefixClass(keyValue)} >
      {fieldNames.map((fieldName, index)=>{
        console.log(data);
        console.log(fieldName)
        console.log(data[fieldName]);
        return <td key={prefixClass(index)} >{data[fieldName]}</td>
      })}
    </tr>
  )
}

RowByFields.propTypes = {
  data: P.object,
  fieldsNum: P.number,
  keyValue: P.number,
  fieldNames: P.array,
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
