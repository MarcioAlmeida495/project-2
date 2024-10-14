import { useRef, useState } from "react";
import "./styles.css";
import PropTypes from 'prop-types';

function InputSearch({onKeyUp}) {
  const [value, setValue] = useState('');
  console.log('input renderizou');
  const thisInput = useRef(null);


  return <input
  placeholder="Type your Search"
  className="searchInput"
  value={value}
  onChange={(event)=>{
    const { value } = event.target;
    console.log('VALUE',event.target.value);
    setValue(value);
    onKeyUp(event, value);
  }
  }
  onKeyUp={(event)=>{
    console.log(value);
    console.log(event.target.value);
    console.log('KEY:', event.key);
    onKeyUp(event, value);
    // setValue(event.target.value);
  }}
  type="search"
  ref={thisInput}
  />;
}

InputSearch.propTypes = {
  onKeyUp: PropTypes.func,
  blinking: PropTypes.bool,
}

export default InputSearch;
