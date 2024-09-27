/* eslint-disable prettier/prettier */
import logo from './logo.svg';
import './App.css';
import { ButtonReverse } from './Components/Button/ButtonReverse';
import { useState, useEffect } from 'react';

function App() {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(10);


  useEffect(() => {
    console.log(counter2);
  }, [counter]);

  useEffect(() => {
    document.getElementById('myH1').innerHTML = 'HELLO';
  });

  return (
    <div className="App">
      <h1 id="myH1">Contador: {counter}</h1>
      <h1>Contador2: {counter2}</h1>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <button onClick={() => setCounter2(counter2 + 2)}>Increment</button>
    </div>
  );
}

export default App;
