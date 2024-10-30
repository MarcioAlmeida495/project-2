import { useEffect, useRef, useState } from "react";
import "./styles.css";
import PropTypes from 'prop-types';

function InputSearch({onKeyUp, onChange = () => {},datasSearch = [], formFieldName = 'searchInput'}) {
  const [value, setValue] = useState('');
  console.log(datasSearch)
  console.log('input renderizou');
  const thisInput = useRef(null);

  useEffect(()=>{
    //thisInput.current.select();
  });

  return <input
  name={formFieldName}
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
  datasSearch: PropTypes.array,
  formFieldName: PropTypes.string,
  onChange: PropTypes.func,
}

export default InputSearch;
