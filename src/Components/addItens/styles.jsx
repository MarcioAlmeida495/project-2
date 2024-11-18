import { styled } from 'styled-components';

export const styledButton = styled.button`
    background-color: #4CAF50;
    margin: 2px 10% 2px 10%;
    width: 80%;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    min-width: 500px;
    &:hover {
      background-color: #45a049;
    }
  `;

export const styledInput = styled.input`
  width: 80%;
  margin: 2px 10%;
  padding: 8px;
  font-size: 17px;
  box-sizing: border-box;
  text-align: center;
  @:focus{
  border: 2px solid white;
  border-radius: 2px;


`;

export const styledInputAddIten = (tam) => styled.input`
  width: ${tam}px;
  margin: 2px 10%;
  padding: 8px;
  font-size: 17px;
  box-sizing: border-box;
  text-align: center;
  @:focus{
  border: 2px solid white;
  border-radius: 2px;
`
