import { useEffect } from "react";
import { styledButton, styledInputAddIten } from "./styles";
import P from 'prop-types';
const InputDesc = styledInputAddIten(200);
const InputValue = styledInputAddIten(200);
const InputQtd = styledInputAddIten(50);
const ButtonConfirm = styledButton;
export const AddIten = ({keyValue = 0, handleRemove}) => {
  console.log('HANDLEREMOVE', typeof handleRemove);
  useEffect(()=>{
    console.log('HANDLEMUDOU', handleRemove);
  }, [handleRemove]);

  const handleClick = (num) => {
    console.log(num);
    handleRemove(keyValue);
  }
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <InputDesc type="text" id="descricao" name="descricao" placeholder="Descrição" />
          </td>
          <td>
            <InputValue type="text" id="venda" name="venda" placeholder="Valor de Venda" />
          </td>
          <td>
            <InputValue type="text" id="compra" name="compra" placeholder="Valor de Compra" />
          </td>
          <td>
            <InputQtd type="text" id="qtd" name="qtd" placeholder="qtd" />
          </td>
          <td>
            <ButtonConfirm onClick={()=>handleClick(0)} >Adicionar</ButtonConfirm>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

AddIten.propTypes = {
  handleRemove: P.func,
  keyValue: P.number,
}
