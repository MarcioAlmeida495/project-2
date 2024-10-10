import './styles.css'

import P from 'prop-types';

export function SimpleInput ({placeholder}) {
  return <input className='simpleinput' placeholder={placeholder}/>

}

SimpleInput.propTypes = {
  placeholder: P.string,
}
