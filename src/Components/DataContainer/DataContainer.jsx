/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import { LoadingIcon } from '../Loading/LoadingIcon';

var bool = true;

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

function DataContainer({search}) {
  var data = [];
  const [name, setName] = useState(search);
  const [text, setText] = useState('Textando');

  const loading = LoadingIcon();

  init.body = JSON.stringify({name: name});
  useEffect(()=>{
    fetch('http://localhost:8080/fetch', init)
      .then(r=> r.json()
      .then(r => {
        data = Object.values(r);
        bool = !bool;
        var arr = [];
        console.log(arr)
        setText(data);
      }));
  }, []);


  return (
    <div className='card'>
      <h4 className='card-header' >{name}</h4>
      <div className='card-context' >{bool ? loading : text}</div>
    </ div>
  )
}

export default DataContainer;

DataContainer.propTypes = {
  search: PropTypes.string,
}
