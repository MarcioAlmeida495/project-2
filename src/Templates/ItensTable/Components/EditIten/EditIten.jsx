import P from 'prop-types';
import './styles.css';

// export const EditIten = ({ fields = [], onSubmit = ()=>{} }) => {
//   const [formData, setFormData] = useState(
//     fields.reduce((acc, field) => {
//       acc[field.name] = field.value || ''; // Inicializando com o valor padrão
//       return acc;
//     }, {})
//   );

//   // Função para atualizar o estado conforme os inputs mudam
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Função para submeter o formulário
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData); // Enviar os dados do formulário
//   };

//   return (
//     <div className="modal">
//       <form onSubmit={handleSubmit}>
//         {fields.map((field, index) => (
//           <div key={index}>
//             <label>{field.name}</label>
//             <input
//               type="text"
//               name={field.name}
//               value={formData[field.name]}
//               onChange={handleInputChange}
//             />
//           </div>
//         ))}
//         <button type="submit">Enviar</button>
//       </form>
//     </div>
//   );
// };

// EditIten.propTypes = {
//   fields: P.array,
//   onSubmit: P.func,
// }

export const EditIten = ({fields}) => {
  console.log(fields);
  return (
    <div>

    </div>
  )
}
EditIten.propTypes = {
  fields: P.array,
  onSubmit: P.func,
}
