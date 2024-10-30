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
