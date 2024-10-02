/* eslint-disable prettier/prettier */
import "./styles.css";
import PropTypes from 'prop-types';

function InputSearch({onKeyUp}) {
  console.log('input renderizou');
  return <input className="searchInput" onKeyUp={(e)=>{onKeyUp(e, e.target.value)}} type="search" />;
}

InputSearch.propTypes = {
  onKeyUp: PropTypes.func,
}

export default InputSearch;
