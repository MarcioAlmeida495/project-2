import { useEffect, useState } from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import { LoadingIcon } from '../Loading/LoadingIcon';
import InputSearch from '../Inputs/InputSearch';

const URL2 = 'https://vendaappxxx-1.onrender.com/fetch';
const URL = 'http://localhost:8080/fetch';
const URLedit = 'http://localhost:8080/API/edicoes';
const URLbuy = 'http://localhost:8080/API/compra';

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

function DataContainer() {
  console.log('dataContainer renderizou');

  // Estado para controlar o texto e o carregamento
  const [text, setText] = useState('Textando');
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const [search, setSearch] = useState('Marcio Almeida');
  const loading = LoadingIcon();

  init.body = JSON.stringify({ name: search });

  const fetchEdicoes = () => {
    fetch(URLedit, init)
    .then((r) => r.json())
    .then((r) => {
      const data = Object.values(r);
      const arr = data[0].split(/\r?\n/);

      console.log('Dados recebidos:', data);
      setText(data); // Define os dados recebidos como texto
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
        setText(data); // Define os dados recebidos como texto
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
      <div className="card-context">{isLoading ? loading : text}</div>
      <button onClick={() => fetchEdicoes()}>edicoes</button>
    </div>
  );
}

export default DataContainer;

DataContainer.propTypes = {
  search: PropTypes.string,
};
