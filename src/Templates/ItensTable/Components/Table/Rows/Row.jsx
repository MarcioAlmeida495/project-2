import { useEffect, useReducer, useRef, useState } from 'react';
import './styles.css';
import P from 'prop-types';

const prefixClass = (key) => `trRow[${key}]`;


export default function Row({data = {}, fieldsNum = 6, keyValue = 0}){
  const [dataValue, setDataValue] = useState({});
  const [fields, setFields] = useState([]);
  const [fieldsValues, setFieldsValues] = useState([]);
  const trRef = useRef(null);
  // console.log('RENDERIZOU FILHO');
  // console.log('DATA', data);
  // console.log('INDEX', keyValue);

  const handleClick = (event) => {
    // console.log(event.target)
    // console.log(trRef);
    // console.log(trRef.current.querySelectorAll('td'));
    const children = [...trRef.current.children];
    // console.log(children);
    children.map(child => {
      if(event.target != child){
        child.innerHTML = <input type='text' value={child.innerHTML}/>
      }
    })

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

  return (
        <tr ref={trRef} className={prefixClass(keyValue)} >
          {fieldsValues.map((value, index) => (
            index<fieldsNum &&
            <td key={`trtd${keyValue}${index}`}>
              {typeof value === 'object' ? JSON.stringify(value) : value}
            </td>
          ))}
          <td>
            <button onClick={handleClick} className='checkAction' >Editar</button>
            <button className='checkAction' >Deletar</button>
          </td>
        </tr>
  );
}

Row.propTypes = {
  data: P.object,
  fieldsNum: P.number,
  keyValue: P.number,
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
