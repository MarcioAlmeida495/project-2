import { useEffect, useState } from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import { LoadingIcon } from '../Loading/LoadingIcon';

var init = {
  method: 'POST', // Método HTTP (pode ser 'GET', 'POST', 'PUT', 'DELETE', etc.)
  headers: {
    'Content-Type': 'application/json', // Tipo de conteúdo que estamos enviando
    'Authorization': 'Bearer token'     // Exemplo de autenticação
  },
  body: JSON.stringify({                // Corpo da requisição (no caso de POST/PUT)
    nome: 'Matheus',
    idade: 30
  })
};

function DataContainer({ search }) {
  console.log('dataContainer renderizou');

  // Estado para controlar o texto e o carregamento
  const [text, setText] = useState('Textando');
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const loading = LoadingIcon();

  init.body = JSON.stringify({ name: search });

  useEffect(() => {
    console.log('AQUI??!?!?!');
    setIsLoading(true); // Inicia o carregamento

    fetch('http://localhost:8080/fetch', init)
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

  return (
    <div className="card">
      <h4 className="card-header">{search}</h4>
      {/* Se estiver carregando, mostra o ícone de carregamento, senão mostra o texto */}
      <div className="card-context">{isLoading ? loading : text}</div>
    </div>
  );
}

export default DataContainer;

DataContainer.propTypes = {
  search: PropTypes.string.isRequired,
};
