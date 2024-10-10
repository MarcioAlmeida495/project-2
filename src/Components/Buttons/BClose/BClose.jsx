import P from 'prop-types';
import './styles.css'

export function BClose({onClick}) {
  return <button className='bclose' onClick={onClick} style={{float: 'right'}} ></button>
}

BClose.propTypes = {
  onClick: P.func,
}
