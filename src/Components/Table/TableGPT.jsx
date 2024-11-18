import React from 'react';
import P from 'prop-types';

export default function TableGPT({ data }){
  // Verifica se o dado é um objeto e não está vazio
  if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
    return <p>Nenhum dado disponível</p>;
  }

  // Extrai as chaves e valores do objeto
  const keys = Object.keys(data);
  const values = Object.values(data);

  return (
    <table border="1" cellPadding="10" cellSpacing="0">
      <thead>
        <tr>
          <th>Chave</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        {keys.map((key, index) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{typeof values[index] === 'object' ? JSON.stringify(values[index]) : values[index]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TableGPT.propTypes = {
  data: P.object,
}
