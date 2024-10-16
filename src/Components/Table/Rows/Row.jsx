import { useEffect, useState } from 'react';
import './styles.css';
import P from 'prop-types';

export default function Row({data = {}, fieldsNum = 6, key}){
  const [dataValue, setDataValue] = useState({});
  const [fields, setFields] = useState([]);
  const [fieldsValues, setFieldsValues] = useState([]);
  console.log('RENDERIZOU FILHO');
  console.log('DATA', data)

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
        <tr>
          {fieldsValues.map((value, index) => (
            index<fieldsNum &&
            <td key={index}>
              {typeof value === 'object' ? JSON.stringify(value) : value}
            </td>
          ))}
        </tr>
  );
}

Row.propTypes = {
  data: P.object,
  fieldsNum: P.number,
  key: P.number,
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
