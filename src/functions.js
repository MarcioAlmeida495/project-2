export const dataFetch = (url, dataInit = '') => new Promise((resolve, reject)=>{
  if(dataInit != ''){
    fetch(url, dataInit).then(r=>
      r.json())
      .then(r=>{
        resolve(r);
      });
  }
  else{
    fetch(url).then(r=>
      r.json())
      .then(r=>{
        resolve(r);
      });
  }
  // resolve();
})



export const formatDataInit = (body = {}) => {
  return {
    method: 'POST', // Método HTTP (pode ser 'GET', 'POST', 'PUT', 'DELETE', etc.)
    headers: {
      'Content-Type': 'application/json', // Tipo de conteúdo que estamos enviando
      'Authorization': 'Bearer token'     // Exemplo de autenticação
    },
    body: JSON.stringify(body)
  }
}

export function formatDate(dateString) {
  // Converte a string da data em um objeto Date
  var dateArr = dateString.split('-');
  dateArr[0] = (dateArr[0]%1000).toString();
  dateArr[2] = dateArr[2] < 10 ? (parseInt(dateArr[2])).toString() : dateArr[2];
  return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
}

export function calcularTotal(texto) {
  var total = '0.00'; // Inicializando total como um número, não como uma string.
  var auxtext = texto.replaceAll(',', '.');
  const arr = auxtext.split(/[ ;\n]+/);

  arr.map((element) => {
    if (/[.,]/.test(element)) {
      var evalValue;
      try {
        //console.log('ELEMENT: ', element);
        evalValue = eval(element);
        //console.log('dps do Eval', evalValue);

      } catch (error) {
        evalValue = '0.00';
      }
      var elementValue = parseFloat(evalValue); // Converte o valor em float
      if (!isNaN(elementValue)) {
        total += ' + ' + elementValue; // Soma o valor diretamente ao total
        //console.log(total);
      }
    }
  });
  //console.log('TESTANDO EVAL', eval('0 + 10 * 5 + 2'));
  total = eval(total);
  //console.log(`Total final: ${total}`);
  return total;
}

export var init = {
  method: 'POST', // Método HTTP (pode ser 'GET', 'POST', 'PUT', 'DELETE', etc.)
  headers: {
    'Content-Type': 'application/json', // Tipo de conteúdo que estamos enviando
    'Authorization': 'Bearer token'     // Exemplo de autenticação
  },
  body: JSON.stringify({                // Corpo da requisição (no caso de POST/PUT)
    nome: 'Matheus',
  })
};

export function formatData(nome = '', compra = ''){
  return init = {
    method: 'POST', // Método HTTP (pode ser 'GET', 'POST', 'PUT', 'DELETE', etc.)
    headers: {
      'Content-Type': 'application/json', // Tipo de conteúdo que estamos enviando
      'Authorization': 'Bearer token'     // Exemplo de autenticação
    },
    body: JSON.stringify({
      nome: nome,
      compra: compra,
    })
  }
}


export function dateNow () {
  var d = new Date();
  var dia = d.getDate(); + "-"  + d.getFullYear();
  var mes = d.getMonth() + 1;
  if(mes<10)mes = "0" + mes.toString();
  var ano = d.getFullYear();
  ano = ano % 1000;

  var data = dia +"-"+ mes +"-"+ ano;
  return data;
}

export const fetchEdicoes = (body) => {
  fetch(URLedit, formatData(body))
  .then((r) => r.json())
  .then((r) => {

    //console.log('Dados recebidos:', r);
    setText(r.id); // Define os dados recebidos como texto
    setIsLoading(false); // Termina o carregamento
  })
}

export async function awaitFetch (URL, init) {
  fetch(URL, init)
      .then((r) => r.json())
      .then((r) => {
        const data = Object.values(r);
        const arr = data[0].split(/\r?\n/);

        //console.log('Dados recebidos:', data);
        //console.log(data);
        return data;
      });
}

export const getDataFetch = (URL, init) => new Promise((resolve, reject) => {
  fetch(URL, init)
      .then((r) => r.json())
      .then((r) => {
        const data = Object.values(r);
        const arr = data[0].split(/\r?\n/);
        resolve(data[0]);
        // console.log('Dados recebidos:', data);
        // setText(data[0]); // Define os dados recebidos como texto
        // setTotal(calcularTotal(data[0]));
        // setIsLoading(false); // Termina o carregamento
      });
})
