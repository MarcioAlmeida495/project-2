import { useEffect, useRef, useState } from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import { LoadingIcon } from '../Loading/LoadingIcon';
import InputSearch from '../Inputs/InputSearch';
import TextDivider from '../TextDivider/TextDivider';

const URL2 = 'https://vendaappxxx-1.onrender.com/fetch';
const URL = 'http://localhost:80/fetch';
const URLedit = 'http://localhost:80/API/edicoes';
const URLbuy = 'http://localhost:80/API/compra';

var init = {
  method: 'POST', // Método HTTP (pode ser 'GET', 'POST', 'PUT', 'DELETE', etc.)
  headers: {
    'Content-Type': 'application/json', // Tipo de conteúdo que estamos enviando
    'Authorization': 'Bearer token'     // Exemplo de autenticação
  },
  body: JSON.stringify({                // Corpo da requisição (no caso de POST/PUT)
    nome: 'Matheus',
  })
};

function formatData(body){
  return init = {
    method: 'POST', // Método HTTP (pode ser 'GET', 'POST', 'PUT', 'DELETE', etc.)
    headers: {
      'Content-Type': 'application/json', // Tipo de conteúdo que estamos enviando
      'Authorization': 'Bearer token'     // Exemplo de autenticação
    },
    body: JSON.stringify(body)
  }
}

function DataContainer() {
  console.log('dataContainer renderizou');

  // Estado para controlar o texto e o carregamento
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const [search, setSearch] = useState('Marcio Almeida');
  const loading = LoadingIcon();
  const refContext = useRef(null);

  init.body = JSON.stringify({ name: search });

  const fetchEdicoes = (body) => {
    fetch(URLedit, formatData(body))
    .then((r) => r.json())
    .then((r) => {

      console.log('Dados recebidos:', r);
      setText(r.id); // Define os dados recebidos como texto
      setIsLoading(false); // Termina o carregamento
    })
  }

  useEffect(() => {
    console.log('AQUI??!?!?!');
    setIsLoading(true); // Inicia o carregamento

    fetch(URL, init)
      .then((r) => r.json())
      .then((r) => {
        const data = Object.values(r);
        const arr = data[0].split(/\r?\n/);

        console.log('Dados recebidos:', data);
        setText(data[0]); // Define os dados recebidos como texto
        setIsLoading(false); // Termina o carregamento
      });
  }, [search]);

  useEffect(() => {
    console.log('Texto alterado:', text);
  }, [text]);

  const handleKeyUp = (e, value) => {
    if(e.key === 'Enter') {
      setSearch(value);
    }

  };
  const handleKeyUpBuy = (e, value) => {
    if(e.key === 'Enter') {
      setSearch(value);
    }

  };
  return (
    <div className="card">
      <InputSearch onKeyUp={handleKeyUp}/>
      <h4 className="card-header">{search}</h4>
      {/* Se estiver carregando, mostra o ícone de carregamento, senão mostra o texto */}
      <div className="card-context">{isLoading ? loading : <TextDivider text={text}/>}</div>
      <button onClick={() => {fetchEdicoes({name:'Marcio', id:'001'})}}>edicoes</button>
    </div>
  );
}

export default DataContainer;

DataContainer.propTypes = {
  search: PropTypes.string,
};
