import {styled} from 'styled-components';

//USADO EM : textdivider
export const styledP = (margin = 0) => styled.p`
  width: 100%;
  margin: ${margin};
  padding: 5px 0;
  border-bottom: 2px solid #adacac;
  box-sizing: border-box;
`


export const styledButton = (bgcolor = '#1E90FF') => styled.button`
  margin: 1px;
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #adacac;
  background-color: ${bgcolor};
  padding: 10px;
  font-size: 18px;
  color: white;
  transition: ease-in-out background-color 200ms;

  &:hover {
    cursor: pointer;
    background-color: #1E70FF;
  }
`

export const styledInputDate = () => styled.input`
  width: 100%;
  padding: 10px 40px;
  font-size: 16px;
  text-align: center;
  color: #333;
  background-color: #f0f8ff; /* Azul-claro */
  border: 1px solid #007acc; /* Azul forte */
  border-radius: 2px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #00bfff; /* Turquesa claro */
    box-shadow: 0 0 5px rgba(0, 191, 255, 0.5); /* Sombra turquesa */
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(47%) sepia(12%) saturate(7468%) hue-rotate(173deg) brightness(91%) contrast(90%);
  }
`

export const styledScrollBar = () => styled.div`


/* Aplica a estilização na barra de rolagem de todos os elementos */
::-webkit-scrollbar {
  width: 8px; /* Largura da barra de rolagem vertical */
  height: 8px; /* Altura da barra de rolagem horizontal */
}

/* Fundo da área de rolagem */
::-webkit-scrollbar-track {
  background: #85a0af; /* Cor do track (fundo da barra de rolagem) */
  border-radius: 10px;  /* Bordas arredondadas no track */
}

/* Estilo do "thumb" (a parte que se move) da barra de rolagem */
::-webkit-scrollbar-thumb {
  background-color: #5897e9; /* Cor do thumb */
  border-radius: 2px;     /* Bordas arredondadas no thumb */
  border: 1px solid #f1f1f1; /* Adiciona um espaço entre o thumb e o track */
}

/* Thumb quando estiver sendo "hovered" (com o mouse em cima) */
::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Cor do thumb quando em hover */
}

/* Thumb quando estiver ativo (sendo arrastado) */
::-webkit-scrollbar-thumb:active {
  background-color: #333; /* Cor do thumb quando está ativo */
}

/* Adicionar estilos para navegadores que não suportam WebKit (opcional) */

`
