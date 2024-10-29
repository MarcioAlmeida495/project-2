export const dataFetch = (url, dataInit) => new Promise((resolve, reject)=>{
  fetch(url, dataInit).then(r=>
    r.json())
    .then(r=>{
      resolve(r);
    });
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
