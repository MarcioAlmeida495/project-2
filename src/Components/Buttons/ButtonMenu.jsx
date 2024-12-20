import { useEffect, useRef, useState } from 'react';
import './BMenustyles.css';
import P from 'prop-types';

export function ButtonMenu({onClick}) {
  const [vvalue, setVvalue] = useState(0);
  const [checked, setChecked] = useState(true);
  const handleChange = () => {
    setVvalue((value)=>value+1);
  }
  const refIn = useRef(null);
  const handleClick = () => {
    setChecked(!checked);
    onClick();
  }
  useEffect(()=>{
    console.log('MOUNT ??', refIn.current.value);
  },[vvalue])

  return (
    <div className='marginalizado' >
      <div className="containerButton"  >
        <input ref={refIn} checked={checked} onChange={handleChange} onClick={handleClick} type="checkbox" id="checkbox1" className="checkbox1 visuallyHidden"/>
        <label htmlFor="checkbox1">
            <div className="hamburger hamburger1">
                <span className="bar bar1"></span>
                <span className="bar bar2"></span>
                <span className="bar bar3"></span>
                <span className="bar bar4"></span>
            </div>
        </label>
      </div>
    </div>

  )
}

ButtonMenu.propTypes = {
onClick: P.func,
}


