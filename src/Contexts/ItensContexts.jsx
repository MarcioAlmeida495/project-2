import P from 'prop-types';
import { createContext, useContext, useState } from 'react';

// Criação do contexto
export const Context = createContext();

// Provider do contexto que gerencia o estado `counter`
export const ItensContextProvider = ({ children }) => {
  const [counter, setCounter] = useState(0); // Estado local do provider

  return (
    <Context.Provider value={{ counter, setCounter }}>
      {children} {/* Renderiza os componentes filhos */}
    </Context.Provider>
  );
};

// Definindo os PropTypes apenas para `children`, já que `counter` e `setCounter` são internos
ItensContextProvider.propTypes = {
  children: P.node.isRequired,
};

// Hook personalizado para acessar o contexto
export const useItensContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useItensContext must be used within an ItensContextProvider');
  }

  return context; // Retorna `counter` e `setCounter`
};
