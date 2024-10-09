import './BMenustyles.css';
import P from 'prop-types';

export function ButtonMenu({onClick}) {


  return (
    <>
    <div className="containerButton" onClick={onClick} >

      <input type="checkbox" id="checkbox1" className="checkbox1 visuallyHidden"/>
      <label htmlFor="checkbox1">
          <div className="hamburger hamburger1">
              <span className="bar bar1"></span>
              <span className="bar bar2"></span>
              <span className="bar bar3"></span>
              <span className="bar bar4"></span>
          </div>
      </label>

  </div>
    </>
  )
}

ButtonMenu.propTypes = {
  onClick: P.func,
}
