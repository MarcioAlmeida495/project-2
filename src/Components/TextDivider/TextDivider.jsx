import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './styles.css'; // Importa o arquivo CSS
import { MyP } from '../TextContent/TextContent';


const TextDivider = ({ text, updateComponent = ()=>{} }) => {
  const containerRef = useRef(null); // Cria a referência do container
  var total = 0.00;
  // Função para rolar com animação
  const smoothScrollToBottom = () => {
    const container = containerRef.current;
    const duration = 200; // Duração da animação (1 segundo)
    const start = container.scrollTop;
    const end = container.scrollHeight;
    const distance = end - start;
    let startTime = null;

    // Função de animação usando requestAnimationFrame
    const scroll = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1); // Progresso de 0 a 1
      container.scrollTop = start + distance * progress;

      if (progress < 1) {
        window.requestAnimationFrame(scroll); // Continua animando até o fim
      }
    };

    window.requestAnimationFrame(scroll);
  };

  // UseEffect para garantir que role até a última linha quando o componente for renderizado ou atualizado
  useEffect(() => {
    smoothScrollToBottom();
  }, [text]); // Executa toda vez que o `text` muda

  return (
    <div className="text-container" ref={containerRef}>
      {text.split('\n').map((line, index) => (

        <MyP updateComponent={updateComponent} indexKey={index} key={index} className="line">
          {line}
        </MyP>
      ))}
    </div>
  );
};

// Validação das props
TextDivider.propTypes = {
  text: PropTypes.string.isRequired,
  updateComponent: PropTypes.func,
};

export default TextDivider;
