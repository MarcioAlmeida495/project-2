
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
import { DataSelect } from '../Inputs/DataSelect/DataSelect';
import { LinkedAccounts } from '../LinkedAccounts/LinkedAccounts';
import SelectInput from '@mui/material/Select/SelectInput';
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
var counter = 0;
var auxSearch = true;
// var arrValuesFilter = [];
const ScrollBar =  styledScrollBar();
const Button = styledButton('#ccc');
const Div = ({changeColor, children, classname = ''}) => {
  const [thisClassname, setThisClassname] = useState(classname);
  useEffect(()=>{
    setThisClassname(classname)
  }, [classname])
  return (
    (changeColor ?
      <div className={`card bg-color-grey ${thisClassname}`} >{children}</div>
      :
      <div className={`card ${thisClassname}`}>{children}</div>
    )
  )
}
Div.propTypes = {
  changeColor: PropTypes.bool,
  children: PropTypes.node,
  classname: PropTypes.string,
}
function DataContainer({ typeOfContainer = 'OPEN', changeClass = '' ,onChangeName = () => {}, type = false, newSearch = dateNow(), index, upAtributes = []}) {
  //console.log('dataContainer renderizou');
  const dataContainerContext = useDataContainerContext();
  console.log('COUNTER -->> ', counter++);
  // const dataContainerContext = useDataContainerContext();
  // console.log(dataContainerContext);
  const theContext = useContext(GlobalContext);
  // const DataContainerContext = useDataContainerContext();
  const context = useAllMyPageContext();
  console.log('CONTEXT', context);
  // Estado para controlar o texto e o carregamento
  const [classname, setClassname] = useState(changeClass);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const [search, setSearch] = useState(newSearch);
  const [linkedAccounts, setLinkedAccounts] = useState([]);
  const [total, setTotal] = useState(0.00);
  const [closeble, setCloseble] = useState(true);
  const [newBuy, setNewBuy] = useState('');
  const [updateCounter, setUpdateCounter] = useState(0);
  const [hasPayment, setHasPayment] = useState(type);
  const [isPaying, setIsPaying] = useState(false);
  const loading = LoadingIcon();
  const [isModifier, setIsModifier] = newSearch ? useState(false) : useState(true);
  const refInput = useRef(null);
  const [arrValuesFilter, setarrValuesFilter] = useState([]);
  const [showSelect, setShowSelect] = useState(false);
  const [showModel, setShowModel] = useState(false);
  console.log(upAtributes);
  init.body = JSON.stringify({ name: search });
  function fupdate (value) {
    setUpdateCounter(value);
  }
  useEffect(()=>{
    console.log('linked accounts changed', linkedAccounts);
  }, [linkedAccounts])
  useEffect(()=>{
    setClassname(changeClass);
  }, [changeClass])
  useEffect(()=>{
    setHasPayment(isClient(search))
  }, [type]);

  useEffect(()=>{
    if(search) setIsModifier(false);

    console.log('NEWSEARCH IN DATA CONTAINER',search)
  },[search])

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
      if(search.length > 0)setIsModifier(false);
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

  var arrowCounter = 0;
  const handleKeyUp = (e, value) => {
    setarrValuesFilter(theContext.dataControle.filter((each) => {if(each.toLowerCase().includes(value.toLowerCase()))return each}))
    console.log('TARGETVALUE', e.target.value, 'CONTEXT.DATA', arrValuesFilter);
    if(e.key === 'ArrowDown'){
      if(arrowCounter > 0) arrowCounter--;
      else arrowCounter = arrValuesFilter.length-1;
      e.target.value = arrValuesFilter[arrowCounter];
      // console.log(arrowCounter);
      console.log(e.target);
    }
    if(e.key === 'ArrowUp'){
      if(arrowCounter < arrValuesFilter.length-2)arrowCounter++;
      else arrowCounter = 0;
      e.target.value = arrValuesFilter[arrowCounter];
      console.log(arrValuesFilter[arrowCounter]);
      console.log(arrowCounter);
    }
    if(arrValuesFilter.length === 1 && auxSearch) {
      e.target.value = arrValuesFilter[0];
      // auxSearch = false;
    }

    console.log(e.key);
    if(e.key === 'Enter') {
      // console.log(value);
      // console.log(isClient(value));
      // type = isClient(value);
      onChangeName(e, index);
      setHasPayment(isClient(e.target.value))
      // console.log(type)
      setIsModifier(false);
      setSearch(e.target.value);
      console.log(search);
    }

  };
  const enterUp = (e) => {
    if(linkedAccounts.length > 0){
      linkedAccounts.forEach(each => {
        handleSendData(e.target.value, each);
      })
    }
    else{
      console.log(e.target.value);
      handleSendData(e.target.value, search);

    }

  }
  const handleSendData = (value, name) => {

    init.body = JSON.stringify({ name: name, compra: value});
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

  useEffect(()=>{
    console.log('LINKS', DataContainerContext.getLinks);
  }, [dataContainerContext.links])

  const handleAddLink = () => {
    setShowModel(!showModel);
    console.log('GETLINKS',dataContainerContext.getLinks());
    dataContainerContext.setLinks([...dataContainerContext.getLinks(), { card: 'teste', values: 'values'}]);
  }

  function onChangeSelect (value){
    console.log(value);
    setSearch(value);
  }
  // const  clickhere = (value) => {
  //   console.log(value, context);
  //   context.fns[2]();
  // }

  console.log(search)
  return (
      <DataContainerContext data={{search: search}}>
        <Div classname={classname} changeColor={isModifier}>
          <div style={{float: 'right'}}>
            {linkedAccounts.length>0 && linkedAccounts.map((acc, index) => {return <h3 key={index}>{acc}</h3>})}
            {console.log('DATACONTAINERCONTEXT', dataContainerContext)}
            {isModifier && <button onClick={()=>{handleAddLink()}}> {linkedAccounts.length > 0 ? 'Close This' : 'Link Accounts'} </button>}
            {showModel && <LinkedAccounts func={(e)=>{setLinkedAccounts(e)}}></LinkedAccounts>}
            {closeble && <BClose onClick={handleRemoveCard} />}
            <input ref={refInput} onChange={() => {setCloseble(!closeble)}} className='checkCloseble' name='toggleCloseble' type="checkbox" />
            {closeble && linkedAccounts.length ===0 && <><InputSearch thisValue={search} onKeyUp={handleKeyUp}/></>}
            {showSelect || arrValuesFilter.length>0 ? <DataSelect onChange={onChangeSelect} data={arrValuesFilter}/> : <button onClick={()=>{setShowSelect(!showSelect); }} >x</button>}
          </div>
          <h4 className="card-header">{search}</h4>
          {/* Se estiver carregando, mostra o ícone de carregamento, senão mostra o texto */}
          <div className="card-context">{isLoading ? loading : <TextDivider updateComponent={()=>setUpdateCounter(updateCounter+1)} text={text}/>}</div>
          <div className='showTotal'>{`Valor Total: ${total.toFixed(2)}`}</div>
          {/* Input abaixo para realizar uma compra */}
          <SimpleInput forceValue={newBuy} onKeyUp={enterUp} placeholder={'Uma Nova Compra'}/>
          {hasPayment && ( isPaying ? <SimpleInput onBlur={()=>setIsPaying(false)} placeholder={'Digite o Valor a ser Pago'} onKeyUp={handlePayment} /> : <Button onClick={()=>{setIsPaying(!isPaying)}}>Pagamento</Button>)}
        </Div>
      </DataContainerContext>
  );
}

export default DataContainer;

DataContainer.propTypes = {
  newSearch: PropTypes.string,
  index: PropTypes.number,
  upAtributes: PropTypes.array,
  type: PropTypes.bool,
  onChangeName: PropTypes.func,
  changeClass: PropTypes.string,
  typeOfContainer: PropTypes.string,
};
