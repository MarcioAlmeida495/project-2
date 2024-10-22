export const getInit = (object) => new Promise((resolve, reject)=>{
  resolve({
        method: 'POST', // Método HTTP (pode ser 'GET', 'POST', 'PUT', 'DELETE', etc.)
        headers: {
          'Content-Type': 'application/json', // Tipo de conteúdo que estamos enviando
          'Authorization': 'Bearer token'     // Exemplo de autenticação
        },
        body: JSON.stringify(object)
      }
  )
});
