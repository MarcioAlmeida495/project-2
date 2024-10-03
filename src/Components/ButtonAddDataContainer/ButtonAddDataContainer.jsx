import PropTypes from 'prop-types';
import './styles.css';

function ButtonAddDataContainer({AddDataContainer}) {

  return <button className='bAddContainer' type="button" onClick={() => AddDataContainer()}>+</button>
}

export default ButtonAddDataContainer;

ButtonAddDataContainer.propTypes = {
  AddDataContainer: PropTypes.func,
};
