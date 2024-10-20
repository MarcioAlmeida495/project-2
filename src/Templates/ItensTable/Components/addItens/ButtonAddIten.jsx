import { useState } from "react";
import {  styledButton, styledInput } from "./styles";
import {AddNewIten} from './AddNewIten';
import P from 'prop-types';

var counter = 0;
const MyButton = styledButton;
const StyledInput = styledInput;
export default function AddItens({handleIncrementCounter}){
  const [counterAdds, setCounterAdds] = useState([]);
  console.log('TIPO DO HANDLEINCREMENT', typeof handleIncrementCounter)
  function handleRemove(){
    console.log('HANDLEREMOVeeeeeeeeE', typeof handleRemove);
  }
  console.log('HANDLEEEE',typeof handleRemove);
  const handleClick = () => {
    console.log(counterAdds);
    console.log('TYPEOF', typeof counterAdds);
    counter++;
    setCounterAdds([...counterAdds, <AddNewIten handleIncrementCounter={handleIncrementCounter} handleRemove={handleRemove}  keyValue={counter} key={counter}/>]);
  }
  return (
    <>
      {counterAdds.map(add => add)}
      <MyButton onClick={() => handleClick()}>INSIRA UM NOVO ITEN</MyButton>
    </>
  )
}
AddItens.propTypes = {
  handleIncrementCounter: P.func,
}
