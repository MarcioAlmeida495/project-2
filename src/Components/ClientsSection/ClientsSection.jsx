import { useCallback, useContext, useEffect, useRef, useState } from "react";
import './styles.css';
import { ButtonMenu } from "../Buttons/ButtonMenu"; // Assumindo que o ButtonMenu seja simples
import { GlobalContext } from "../../Templates/Home/Home";
import InputSearch from "../Inputs/InputSearch/InputSearch";
import { useAllMyPageContext } from "../../Contexts/AllMyPageContext";
import { styledButton } from "../../StyledComponents";
import { SimpleInput } from "../Inputs/SimpleImput/SimpleInput";
import { InputDate } from "../Inputs/InputDate/InputDate";
import { dataFetch, formatData, formatDataInit, formatDate } from '../../functions';
import { URLAddClient, URLFetchControle } from "../../apiURLS";
// import { useDataContainerContext } from "../../Contexts/DataContainerContext";
const Button = styledButton();

function ordenarSemMaiusculas(array) {
  return array.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
}

export default function ClientsSection () {
  // const containerContext = useDataContainerContext();
  const theContext = useContext(GlobalContext);
  const [open, setOpen] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [clients, setClients] = useState([]);
  const [value, setValue] = useState('');
  const [addingName, setAddingName] = useState('');
  const [updateCounter, setUpdateCounter] = useState(0);
  const sectionRef = useRef(null);
  const context = useAllMyPageContext();
  console.log(context);
  console.log('RENDERIZOU');

  const attComponent = () => {
    dataFetch(URLFetchControle).then(data=>{
      const arr = data.split(/\n|\r/);
      const sortArr = ordenarSemMaiusculas(arr);
      setClients(sortArr);
    })
  }

  const handleSearch = (client, type = false) => {
    console.log(theContext, client);
    theContext.counter++;
    setValue('');
    theContext.addNewDataContainer(client, type);
  }
  // Controla a classe do elemento baseado no estado "open"
  useEffect(() => {
    console.log('teste');
    if (sectionRef.current) {
      sectionRef.current.className = open ? 'ClientsSection Open' : 'ClientsSection Close';
    }

    console.log(context);
  }, [open]);


  // Faz a chamada para buscar os clientes e ordena
  useEffect(() => {
    function teste (){console.log('tess')}
    context.setFns([...context.fns, teste]);
    // context.setFns()=>console.log('OPORRA'));
    // fetch('http://localhost/fetchControle')
    //   .then(r => r.json())
    //   .then(data => {
    //     const arr = data.split(/\n|\r/);
    //     const sortArr = ordenarSemMaiusculas(arr);
    //     setClients(sortArr);
    //   });
    dataFetch('http://localhost/fetchControle').then(data=>{
      const arr = data.split(/\n|\r/);
      const sortArr = ordenarSemMaiusculas(arr);
      setClients(sortArr);
    })
  }, []);

  // Função para alternar o estado "open"
  const Open = useCallback((e) => {
    setValue('');
    setOpen((prev) => {
      console.log('BOOL', prev);
      return !prev;
    });
  }, []);

  const onKeyUp = (e) => {
    setValue(e.target.value);
  };
  console.log(context)
  return (
    <section ref={sectionRef} className={'ClientsSection'}>
      <ButtonMenu onClick={Open} />

        {
          open && (
            isAdding ?
            <>
              <SimpleInput
                upValue={addingName}
                onKeyUp={(event)=>{
                  console.log(event.key);
                  // event.key === 'Enter' && console.log(formatDataInit({nome: event.target.value}))
                  event.key === 'Enter' && dataFetch(URLAddClient, formatDataInit({nome: event.target.value}))
                    .then(r=> {
                      handleSearch(r.client);
                      attComponent();
                    });
                  // console.log('ADDINGNAME', event.target.value);
                  setAddingName(event.target.value)}
                }
                placeholder={'Nome do Cliente'}
                onBlur={()=>{setIsAdding(!isAdding)}}
              ></SimpleInput>
              <Button>Confirmar</Button>
            </>
            :
            <Button onClick={()=>{setIsAdding(!isAdding)}} >Adicionar Cliente</Button>
          )
        }
      {open &&  <InputDate onChange={(event)=>{
        var date = formatDate(event.target.value);
        handleSearch(date);
      }} />}
      {open && <InputSearch onKeyUp={onKeyUp} datasSearch={clients}/>}
      {open && clients.map((client, index) => {
        if (client.length > 0 && client.toUpperCase().includes(value.toUpperCase())) {
           return (
              <div key={index}>
                <button className="clientsButton" onClick={() =>{handleSearch(client, true)}}>{client}</button>;
                <button>Delete</button>
              </div>
           )

        }
        return null;
      })}

    </section>
  );
}
