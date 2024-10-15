import './styles.css';
import P from 'prop-types';
export default function NavBar({changeTemplate}) {
  return (
    <nav className="myNavBar">
      <a onClick={()=>{changeTemplate(0)}}>Home</a>
      <a onClick={()=>{changeTemplate(1)}}>Sobre</a>
      <a onClick={()=>{changeTemplate(2)}}>Contato</a>
    </nav>
  );
}
NavBar.propTypes = {
  changeTemplate: P.func,
}
