import logo from './logo.svg';
import './App.css';
import { ButtonReverse } from './Components/Button/ButtonReverse';
import { useState } from 'react';

function App() {
  const [reverse, setReverse] = useState(false);
  const [counter, setCounter] = useState(0);
  const reverseClass = reverse ? 'reverse' : '';
  const handleClick = () => {
    setReverse(!reverse);
    console.log('teste commit')
  };
  const handleClickCounter = () => {
    setCounter(counter + 1);
    console.log('teste');
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className={`App-logo ${reverseClass}`} alt="logo" />
        <h1>{`Contador: ${counter}`}</h1>
        <ButtonReverse onClick={handleClick} text="Click To Reverse Spin" />
        <ButtonReverse onClick={handleClickCounter} text="Click To Increment" />
      </header>
    </div>
  );
}

export default App;
