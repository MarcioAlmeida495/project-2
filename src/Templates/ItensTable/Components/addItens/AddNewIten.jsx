import { useContext, useEffect, useRef } from "react";
import { styledButton, styledInputAddIten } from "./styles";
import { ItensContextProvider, useItensContext } from "../../../../Contexts/ItensContexts";
import P from 'prop-types';
import { URLcadNewIten } from "../../../../apiURLS";
import {postFetchProduct, postFetchProductPromise} from './functions';

const InputDesc = styledInputAddIten(200);
const InputValue = styledInputAddIten(200);
const InputQtd = styledInputAddIten(50);
const ButtonConfirm = styledButton;

export const AddNewIten = ({keyValue = 0, handleRemove, handleIncrementCounter}) =>{
  const ItensContext = useItensContext();
  console.log('ITENSSSSCONTEXXTT ----- ', ItensContext);
  const refDesc = useRef(null);
  const refSell = useRef(null);
  const refBuy = useRef(null);
  const refAmt = useRef(null);

  console.log('HANDLEREMOVE', typeof handleRemove);
  useEffect(()=>{
    console.log('HANDLEMUDOU', handleRemove);
  }, [handleRemove]);

  const handleClick = async (num) => {
    console.log(num);
    handleRemove(keyValue);
    console.log('DESC', refDesc.current.value);
    const name = refDesc.current.value;
    const vvProduto = refSell.current.value;
    const vcProduto = refBuy.current.value;
    const quantidade = refAmt.current.value;
    const data = {
      nameProduto: name,
        vvProduto: vvProduto,
        vcProduto: vcProduto,
        quantidade: quantidade,
    }
    const init  = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    }
    console.log(init);
    var response = '';
    postFetchProductPromise(URLcadNewIten, init).then(res => {
      response = res;
      console.log(res);
      ItensContext.setCounter(ItensContext.counter + 1);
    });
    // console.log(await postFetchProduct(URLcadNewIten, init));
    // fetch(URLcadNewIten, init).then(r=>{
    //   r.json().then(r=>{
    //     () => handleIncrementCounter();
    //     console.log('OPORRRAA!!', handleIncrementCounter);
    //     console.log(r)
    //   })
    // });

  };
  const incrementCounter = () => {
    ItensContext.setCounter(ItensContext.counter+1);
  }
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <InputDesc type="text" ref={refDesc} id="descricao" name="descricao" placeholder="Descrição" />
          </td>
          <td>
            <InputValue type="text" ref={refSell} id="venda" name="venda" placeholder="Valor de Venda" />
          </td>
          <td>
            <InputValue type="text" ref={refBuy} id="compra" name="compra" placeholder="Valor de Compra" />
          </td>
          <td>
            <InputQtd type="text" ref={refAmt} id="qtd" name="qtd" placeholder="qtd" />
          </td>
          <td>
            <ButtonConfirm onClick={()=>{handleClick(0)}}>Adicionar</ButtonConfirm>
            <ButtonConfirm onClick={()=>{incrementCounter()}}>incrementar</ButtonConfirm>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

AddNewIten.propTypes = {
  handleRemove: P.func,
  keyValue: P.number,
  handleIncrementCounter: P.func,
}
