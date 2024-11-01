import { useEffect, useRef, useState } from 'react';
import './styles.css'

import P from 'prop-types';

export function SimpleInput ({enterOn = true, onBlur = () => {}, className = '', placeholder, onChange = () => {}, onKeyUp, upValue = '', formFieldName = 'searchInput'}) {
  const [value, setValue] = useState(upValue);
  const inputRef = useRef(null);

  const myfunc = (event) => {
    if(event.key === 'Enter' && enterOn){
      onKeyUp(event);
      setValue('');
    }
    if(!enterOn) onKeyUp(event);
  }

  useEffect(() => {
    inputRef.current.focus();
  },[])

  const myOwnonChange = (event) => {
    setValue(event.target.value);

    onChange(inputRef.current.value);
  }
  return <input
    onKeyUp={(e) => myfunc(e)}
    value={value}
    className={`simpleinput ${className}`}
    ref={inputRef} onChange={(e) => myOwnonChange(e)}
    placeholder={placeholder}
    name={formFieldName}
    onBlur={()=>{onBlur()}}
    autoComplete='off'
  />

}

SimpleInput.propTypes = {
  placeholder: P.string,
  onChange: P.func,
  onKeyUp: P.func,
  forceValue: P.string,
  upValue: P.string,
  className: P.string,
  formFieldName: P.string,
  onBlur: P.func,
  enterOn: P.bool,
}
