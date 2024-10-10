
import { useContext, useEffect, useRef, useState } from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import { LoadingIcon } from '../Loading/LoadingIcon';
import InputSearch from '../Inputs/InputSearch';
import TextDivider from '../TextDivider/TextDivider';
import { calcularTotal, formatData, init, dateNow } from './functions';
import { handleKeyUp } from './handles';
import { GlobalContext } from '../../App';

const URL2 = 'https://vendaappxxx-1.onrender.com/fetch';
const URL = 'http://localhost:80/fetch';
const URLedit = 'http://localhost:80/API/edicoes';
const URLbuy = 'http://localhost:80/API/compra';

// const math = require('mathjs');

// function calcularExpressao(expressao) {
//   try {
//     const resultado = math.evaluate(expressao);
//     return resultado;
//   } catch (error) {
//     return "Expressão inválida!";
//   }
// }



function DataContainer({newSearch = dateNow(), key = 0}) {
  //console.log('dataContainer renderizou');
  const theContext = useContext(GlobalContext);
  console.log('KEYYYYYYYYYY', key);
  // Estado para controlar o texto e o carregamento
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const [search, setSearch] = useState(newSearch);
  const [total, setTotal] = useState(0.00);
  const [closeble, setCloseble] = useState(true);
  const loading = LoadingIcon();
  const refContext = useRef(null);
  const refInput = useRef(null);

  init.body = JSON.stringify({ name: search });

  const fetchEdicoes = (body) => {
    fetch(URLedit, formatData(body))
    .then((r) => r.json())
    .then((r) => {

      // console.log('Dados recebidos:', r);
      setText(r.id); // Define os dados recebidos como texto
      setIsLoading(false); // Termina o carregamento
    })
  }

  useEffect(() => {
    // console.log('AQUI??!?!?!');
    setIsLoading(true); // Inicia o carregamento

    fetch(URL, init)
      .then((r) => r.json())
      .then((r) => {
        const data = Object.values(r);
        const arr = data[0].split(/\r?\n/);

        // console.log('Dados recebidos:', data);
        setText(data[0]); // Define os dados recebidos como texto
        setTotal(calcularTotal(data[0]));
        setIsLoading(false); // Termina o carregamento
      });
  }, [search]);

  useEffect(() => {
    //console.log('Texto alterado:', text);
  }, [text]);

  return (
    <div className="card">
      <div style={{float: 'right'}}>
        {closeble && <button onClick={() => {}} style={{float: 'right'}} ></button>}
        <input ref={refInput} onChange={() => {setCloseble(!closeble)}} type="checkbox" style={{float: 'right'}} />
        {closeble && <><InputSearch onKeyUp={handleKeyUp}/></>}
      </div>
      <h4 className="card-header">{search}</h4>
      {/* Se estiver carregando, mostra o ícone de carregamento, senão mostra o texto */}
      <div className="card-context">{isLoading ? loading : <TextDivider text={text}/>}</div>
      <div className='showTotal'>{`Valor Total: ${total.toFixed(2)}`}</div>
      <button onClick={() => {fetchEdicoes({name:'Marcio', id:'001'})}}>edicoes</button>
    </div>
  );
}

export default DataContainer;

DataContainer.propTypes = {
  newSearch: PropTypes.string,
  key: PropTypes.number,
};
