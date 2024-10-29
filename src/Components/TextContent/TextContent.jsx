import { useRef, useState } from "react";
import { styledP } from "../../StyledComponents";
import pTypes from 'prop-types';
import { dataFetch, formatDataInit } from "../../functions";
import { URLEditLine } from "../../apiURLS";
import { useDataContainerContext } from "../../Contexts/DataContainerContext";
const P = styledP('0px');


export const MyP = ({children, indexKey = -1, updateComponent = () => {}}) => {
  const dataContainerContext = useDataContainerContext();
  const refInput = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(children);
  const handleClick = () => {
    setIsEditing(!isEditing);
  }
  const handleChange = () => {
    //console.log(refInput);
    console.log(dataContainerContext.search);
    setValue(refInput.current.value);
  }
  const handleKeyUp = (event) => {
    if(event.key === 'Enter'){
      console.log('KAKAKA');
      dataFetch(URLEditLine, formatDataInit({lineText: value, lineNumber: indexKey, fileName: dataContainerContext.search})).then(r=>console.log(r));
      updateComponent();
      setIsEditing(!isEditing);
    }
  }
  return (
    isEditing ? <input ref={refInput} onKeyUp={() => {handleKeyUp(event)}} value={value} onChange={() => {handleChange()}} /> : <P onClick={()=>{handleClick()}}>{children}</P>
  )
}

MyP.propTypes = {
  children: pTypes.node,
  indexKey: pTypes.number,
  updateComponent: pTypes.func,
}
