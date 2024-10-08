
import { useContext, useEffect, useRef, useState } from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import { LoadingIcon } from '../Loading/LoadingIcon';
import InputSearch from '../Inputs/InputSearch/InputSearch';
import TextDivider from '../TextDivider/TextDivider';
import { calcularTotal, formatData, init, dateNow } from './functions';
import { handleKeyUp } from './handles';
import { GlobalContext } from '../../App';
import { BClose } from '../Buttons/BClose/BClose';
import { SimpleInput } from '../Inputs/SimpleImput/SimpleInput';

const URL2 = 'https://vendaappxxx-1.onrender.com/fetch';
const URL = 'http://localhost:80/fetch';
const URLBuy = 'http://localhost:80/fetchCompra'
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




function DataContainer({newSearch = dateNow(), index}) {
  //console.log('dataContainer renderizou');
  const theContext = useContext(GlobalContext);
  // Estado para controlar o texto e o carregamento
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const [search, setSearch] = useState(newSearch);
  const [total, setTotal] = useState(0.00);
  const [closeble, setCloseble] = useState(true);
  const loading = LoadingIcon();
  const refInput = useRef(null);
  const refBuyInput = useRef(null);
  init.body = JSON.stringify({ name: search });
  const handleKeyUp = (e, value) => {
    if(e.key === 'Enter') {
      setSearch(value);
    }

  };
  const getInit = (data) => {
    return JSON.stringify({ nome: newSearch, compra: data});
  }
  const handleSendData = () => {
    console.log(refBuyInput.current);
    // fetch(URLbuy, getInit(refBuyInput.current.value)
    //   .then(r=> r.json())
    //   .then(r=>{console.log(r)}))
  }
  const handleRemoveCard = () => {
    theContext.removeDataContainer(index);
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
        {closeble && <BClose onClick={handleRemoveCard} />}
        <input ref={refInput} onChange={() => {setCloseble(!closeble)}} type="checkbox" style={{float: 'right'}} />
        {closeble && <><InputSearch onKeyUp={handleKeyUp}/></>}
      </div>
      <h4 className="card-header">{search}</h4>
      {/* Se estiver carregando, mostra o ícone de carregamento, senão mostra o texto */}
      <div className="card-context">{isLoading ? loading : <TextDivider text={text}/>}</div>
      <div className='showTotal'>{`Valor Total: ${total.toFixed(2)}`}</div>
      <SimpleInput  placeholder={'Uma Nova Compra'}/>

    </div>
  );
}

export default DataContainer;

DataContainer.propTypes = {
  newSearch: PropTypes.string,
  index: PropTypes.number,
};
