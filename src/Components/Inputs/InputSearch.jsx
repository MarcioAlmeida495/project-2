import { useRef, useState } from "react";
import "./styles.css";
import PropTypes from 'prop-types';

function InputSearch({onKeyUp}) {
  const [focused, setFocused] = useState(false);
  console.log('input renderizou');
  const thisInput = useRef(null)
  const handleFocused = () => {
    setFocused(true);
  }

  return <input
  placeholder="Type your Search"
  className={ focused ? "searchInput" : "searchInput blinking"}
  onKeyUp={(e)=>{onKeyUp(e, e.target.value)}}
  type="search"
  onFocus={handleFocused}
  ref={thisInput}
  />;
}

InputSearch.propTypes = {
  onKeyUp: PropTypes.func,
}

export default InputSearch;
