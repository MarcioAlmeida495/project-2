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
