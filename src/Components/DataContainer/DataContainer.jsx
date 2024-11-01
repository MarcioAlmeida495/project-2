
import { useContext, useEffect, useRef, useState } from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import { LoadingIcon } from '../Loading/LoadingIcon';
import InputSearch from '../Inputs/InputSearch/InputSearch';
import TextDivider from '../TextDivider/TextDivider';
import { calcularTotal, formatData, getDataFetch, init, dateNow, isClient } from './functions';
import { GlobalContext } from '../../Templates/Home/Home';
import { BClose } from '../Buttons/BClose/BClose';
import { SimpleInput } from '../Inputs/SimpleImput/SimpleInput';
import { URLFetch, URLPayment } from '../../apiURLS';
import { URLbuy } from '../../apiURLS';
import { useAllMyPageContext } from '../../Contexts/AllMyPageContext';
import { DataContainerContext } from '../../Contexts/DataContainerContext';
import { styledScrollBar, styledButton } from '../../StyledComponents';
import { useDataContainerContext } from '../../Contexts/DataContainerContext';
import { dataFetch, formatDataInit } from '../../functions';
// import { handleKeyUp } from './handles';


// const URL2 = 'https://vendaappxxx-1.onrender.com/fetch';
// const URLFetch = 'http://localhost:80/fetch';
// const URLbuy = 'http://localhost:80/fetchCompra'
// const URLedit = 'http://localhost:80/API/edicoes';
// const URLBuy = 'http://localhost:80/API/compra';

// const math = require('mathjs');

// function calcularExpressao(expressao) {
//   try {
//     const resultado = math.evaluate(expressao);
//     return resultado;
//   } catch (error) {
//     return "Expressão inválida!";
//   }
// }


const ScrollBar =  styledScrollBar();
const Button = styledButton('#ccc');
const Div = ({changeColor, children}) => {
  return (
    (changeColor ?
      <div className="card bg-color-grey">{children}</div>
      :
      <div className="card">{children}</div>
    )
  )
}
Div.propTypes = {
  changeColor: PropTypes.bool,
  children: PropTypes.node,
}
function DataContainer({ onChangeName = () => {}, type = false, newSearch = dateNow(), index, upAtributes = []}) {
  //console.log('dataContainer renderizou');
  const theContext = useContext(GlobalContext);
  // const DataContainerContext = useDataContainerContext();
  const context = useAllMyPageContext();
  // Estado para controlar o texto e o carregamento
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const [search, setSearch] = useState(newSearch);
  const [total, setTotal] = useState(0.00);
  const [closeble, setCloseble] = useState(true);
  const [newBuy, setNewBuy] = useState('');
  const [updateCounter, setUpdateCounter] = useState(0);
  const [hasPayment, setHasPayment] = useState(type);
  const [isPaying, setIsPaying] = useState(false);
  const loading = LoadingIcon();
  const [isModifier, setIsModifier] = newSearch ? useState(false) : useState(true);
  const refInput = useRef(null);
  const refButton = useRef(null);
  console.log(upAtributes);
  init.body = JSON.stringify({ name: search });
  function fupdate (value) {
    setUpdateCounter(value);
  }
  useEffect(()=>{
    setHasPayment(isClient(search))
  }, [type]);

  useEffect(()=>{
    upAtributes.push({index: index, updateCounter: updateCounter, setUpdateCounter: fupdate});
  },[]);

  useEffect(()=>{
    setIsLoading(true); // Inicia o carregamento
    init.body = JSON.stringify({ name: search});
    console.log(init)
    fetch(URLFetch, init)
      .then((r) => r.json())
      .then((r) => {
        const data = Object.values(r);
        const arr = data[0].split(/\r?\n/);

        // console.log('Dados recebidos:', data);
        setText(data[0]); // Define os dados recebidos como texto
        setTotal(calcularTotal(data[0]));
        setIsLoading(false); // Termina o carregamento
      });
  },[updateCounter]);

  useEffect(() => {
    // console.log('AQUI??!?!?!');
    setIsLoading(true); // Inicia o carregamento

    getDataFetch(URLFetch, init).then(r=>{
      setText(r); // Define os dados recebidos como texto
      setTotal(calcularTotal(r));
      setIsLoading(false); // Termina o carregamento
    })
  }, [search]);

  useEffect(() => {
    setTotal(calcularTotal(text));
  }, [text, total]);

  const handlePayment = (e, value) => {
    if(e.key === 'Enter'){
      dataFetch(URLPayment, formatDataInit({nome: search, pagamento: e.target.value, typeConnection: 'fetch'}))
      .then(r=>{
        setUpdateCounter(updateCounter + 1);
        setIsPaying(false);
        console.log(r)
      })
    }
  }

  const handleKeyUp = (e, value) => {
    if(e.key === 'Enter') {
      // console.log(value);
      // console.log(isClient(value));
      // type = isClient(value);
      onChangeName(e, index);
      setHasPayment(isClient(value))
      // console.log(type)
      setIsModifier(false);
      setSearch(value);
    }

  };
  const enterUp = (e) => {
    e.key ==='Enter' && handleSendData();
  }
  const handleChange = (value) => {
    setNewBuy(value);
  }

  const handleSendData = () => {

    init.body = JSON.stringify({ name: search, compra: newBuy});
    console.log(init);
    fetch(URLbuy, init)
      .then(r=> r.json())
      .then(r=>{
        setText(r.conteudo);
        setNewBuy('');
        upAtributes[0].setUpdateCounter(upAtributes[0].updateCounter+1);
      })
  }
  const handleRemoveCard = () => {
    theContext.removeDataContainer(index);
  }

  // const  clickhere = (value) => {
  //   console.log(value, context);
  //   context.fns[2]();
  // }
  return (
    <ScrollBar>
      <DataContainerContext data={{search}}>
        <Div changeColor={isModifier}>
          <div style={{float: 'right'}}>
            {isModifier && <button >addLink</button>}
            {closeble && <BClose onClick={handleRemoveCard} />}
            <input ref={refInput} onChange={() => {setCloseble(!closeble)}} className='checkCloseble' name='toggleCloseble' type="checkbox" />
            {closeble && <><InputSearch onKeyUp={handleKeyUp}/></>}
          </div>
          <h4 className="card-header">{search}</h4>
          {/* Se estiver carregando, mostra o ícone de carregamento, senão mostra o texto */}
          <div className="card-context">{isLoading ? loading : <TextDivider updateComponent={()=>setUpdateCounter(updateCounter+1)} text={text}/>}</div>
          <div className='showTotal'>{`Valor Total: ${total.toFixed(2)}`}</div>
          {/* Input abaixo para realizar uma compra */}
          <SimpleInput forceValue={newBuy} onKeyUp={enterUp} onChange={handleChange} placeholder={'Uma Nova Compra'}/>
          {hasPayment && ( isPaying ? <SimpleInput onBlur={()=>setIsPaying(false)} placeholder={'Digite o Valor a ser Pago'} onKeyUp={handlePayment} /> : <Button onClick={()=>{setIsPaying(!isPaying)}}>Pagamento</Button>)}
        </Div>
      </DataContainerContext>
    </ScrollBar>
  );
}

export default DataContainer;

DataContainer.propTypes = {
  newSearch: PropTypes.string,
  index: PropTypes.number,
  upAtributes: PropTypes.array,
  type: PropTypes.bool,
  onChangeName: PropTypes.func,
};
