import { useContext, useEffect, useState } from "react"
import P from 'prop-types';
import styled from "styled-components";
import { DataSelect } from "../Inputs/DataSelect/DataSelect";
import { useDataContainerContext } from "../../Contexts/DataContainerContext";
import { GlobalContext } from "../../Templates/Home/Home";
import {StyledDiv} from "./StyleComponent";
import { SimpleInput } from "../Inputs/SimpleImput/SimpleInput";
import InputSearch from "../Inputs/InputSearch/InputSearch";
const Div = StyledDiv();

const addIfNotExists = (arr = [], element = '') => {
  const newArr = arr;

  if(!newArr.includes(element)) return [...newArr, element];
  else return arr;

}

export const LinkedAccounts = ({func = () => {}, children}) => {
  const [accounts, setAccounts] = useState([]);
  const theContext = useContext(GlobalContext);
  var filter = [];
  useEffect(()=>{
    console.log('accounts xx01 changed: ', accounts);

    func(accounts);
  }, [accounts])

  const handleChange = () => {

  }

  return (
  <Div>
    <div>
      <InputSearch onChange={()=>{console.log('olá')}}/>
      {
        accounts.map((account, index) => {
          return <h5 key={index} >{account}</h5>

      })
      }
    </div>
    <DataSelect onChange={(value)=>{
      console.log(value);

      setAccounts(addIfNotExists(accounts, value));

      console.log('accounts xx02', accounts);
    }} data={theContext.dataControle}/>
    <button>+</button>
  </Div>
  )
}

LinkedAccounts.propTypes = {
  children: P.node,
  func: P.func,
}
