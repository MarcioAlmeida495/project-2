import { useCallback, useContext, useEffect, useRef, useState } from "react";
import './styles.css';
import { ButtonMenu } from "../Buttons/ButtonMenu"; // Assumindo que o ButtonMenu seja simples
import { GlobalContext } from "../../Templates/Home/Home";
import InputSearch from "../Inputs/InputSearch/InputSearch";

function ordenarSemMaiusculas(array) {
  return array.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
}

export default function ClientsSection () {
  const theContext = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [value, setValue] = useState('');
  const sectionRef = useRef(null);

  console.log('RENDERIZOU');

  const handleSearch = (client) => {
    console.log(theContext, client);
    theContext.counter++;
    setValue('');
    theContext.addNewDataContainer(client);
  }
  // Controla a classe do elemento baseado no estado "open"
  useEffect(() => {
    console.log('teste');
    if (sectionRef.current) {
      sectionRef.current.className = open ? 'ClientsSection Open' : 'ClientsSection Close';
    }
  }, [open]);


  // Faz a chamada para buscar os clientes e ordena
  useEffect(() => {
    fetch('http://localhost/fetchControle')
      .then(r => r.json())
      .then(data => {
        const arr = data.split(/\n|\r/);
        const sortArr = ordenarSemMaiusculas(arr);
        setClients(sortArr);
      });
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

  return (
    <section ref={sectionRef} className={'ClientsSection'}>
      <ButtonMenu onClick={Open} />

      {open && <InputSearch onKeyUp={onKeyUp} datasSearch={clients}/>}
      {open && clients.map((client, index) => {
        if (client.length > 0 && client.toUpperCase().includes(value.toUpperCase())) {
          return <button className="clientsButton" onClick={() =>{handleSearch(client)}}  key={index}>{client}</button>;
        }
        return null;
      })}
    </section>
  );
}
