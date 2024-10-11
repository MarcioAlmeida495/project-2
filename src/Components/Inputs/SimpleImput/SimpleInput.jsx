import { useEffect, useRef, useState } from 'react';
import './styles.css'

import P from 'prop-types';

export function SimpleInput ({forceValue, placeholder, onChange, onKeyUp}) {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const myfunc = (event) => {
    if(event.key === 'Enter'){
      onKeyUp(event);
      setValue('');
    }
  }

  useEffect(() => {
    inputRef.current.focus();
  },[])

  const myOwnonChange = (event) => {
    setValue(event.target.value);
    onChange(inputRef.current.value);
  }
  return <input onKeyUp={(e) => myfunc(e)} value={value} className='simpleinput' ref={inputRef} onChange={(e) => myOwnonChange(e)} placeholder={placeholder}/>

}

SimpleInput.propTypes = {
  placeholder: P.string,
  onChange: P.func,
  onKeyUp: P.func,
  forceValue: P.string,
}
