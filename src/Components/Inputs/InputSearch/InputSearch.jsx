import { useEffect, useRef, useState } from "react";
import "./styles.css";
import PropTypes from 'prop-types';


const valueToComplete = 'Marcio Almeida'
function InputSearch({onKeyUp = () => {}, onChange = () => {}, thisValue = '', datasSearch = [], formFieldName = 'searchInput'}) {
  const [value, setValue] = useState(thisValue);
  const [lettersCounter, setLettersCounter] = useState(thisValue.length);
  // console.log(datasSearch)
  // console.log('input renderizou');
  const thisInput = useRef(null);

  useEffect(()=>{
    setValue(thisValue);
  }, [thisValue]);

  return <input
  name={formFieldName}
  placeholder="Type your Search"
  className="searchInput"
  value={value}
  onContextMenu={(event)=>{
    event.preventDefault();
    setValue('');
    const { value } = event.target;
    onKeyUp(event, value )
  }}
  onChange={(event)=>{
    const { value } = event.target;

    event.target.setSelectionRange(lettersCounter+1, valueToComplete.length);
    setLettersCounter(value.length);
    setValue(value);
    onKeyUp(event, value);
  }
  }
  onKeyUp={(event)=>{
    // console.log(value);
    // console.log(event.target.value);
    // console.log('KEY:', event.key);
    onKeyUp(event, value);
    // setValue(event.target.value);
  }}
  type="search"
  ref={thisInput}
  autoComplete='off'
  />;
}

InputSearch.propTypes = {
  onKeyUp: PropTypes.func,
  datasSearch: PropTypes.array,
  formFieldName: PropTypes.string,
  onChange: PropTypes.func,
  thisValue: PropTypes.string,
}

export default InputSearch;
