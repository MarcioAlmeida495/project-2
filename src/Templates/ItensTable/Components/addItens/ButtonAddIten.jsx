import { useState } from "react";
import {  styledButton, styledInput } from "./styles";
import { AddIten } from "./AddIten";
var counter = 0;
const MyButton = styledButton;
const StyledInput = styledInput;
export default function AddItens(){
  const [counterAdds, setCounterAdds] = useState([]);

  function handleRemove(){
    console.log('HANDLEREMOVeeeeeeeeE', typeof handleRemove);
  }
  console.log('HANDLEEEE',typeof handleRemove);
  const handleClick = () => {
    console.log(counterAdds);
    console.log('TYPEOF', typeof counterAdds);
    counter++;
    setCounterAdds([...counterAdds, <AddIten handleRemove={handleRemove}  keyValue={counter} key={counter}/>]);
  }
  return (
    <>
      {counterAdds.map(add => add)}
      <MyButton onClick={() => handleClick()}>INSIRA UM NOVO ITEN</MyButton>
    </>
  )
}
