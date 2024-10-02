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
  console.log('dataContainer renderizou');
  console.log(search)
  var data = [];
  const [text, setText] = useState('Textando');

  const loading = LoadingIcon();

  init.body = JSON.stringify({name: search});
  console.log(init)
  useEffect(()=>{
    fetch('http://localhost:8080/fetch', init)
      .then(r=> r.json()
      .then(r => {
        data = Object.values(r);
        var arr = data[0].split(/\r?\n/);
        console.log(arr);
        if(data)bool = !bool;
        setText(data);
      }));
  }, [search]);


  return (
    <div className='card'>
      <h4 className='card-header' >{search}</h4>
      <div className='card-context' >{bool ? loading : text}</div>
    </ div>
  )
}

export default DataContainer;

DataContainer.propTypes = {
  search: PropTypes.string,
}
