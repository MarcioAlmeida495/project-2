/* eslint-disable prettier/prettier */
import logo from './logo.svg';
import './App.css';
import { ButtonReverse } from './Components/Button/ButtonReverse';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import p from 'prop-types';

const ComponentButton = React.memo(function Button ({fn, num, text}) {
  console.log(fn);
  return <button  onClick={() => fn(num)}>{text}</ button>
})

ComponentButton.propTypes = {
  fn: p.func,
  text: p.string,
  num: p.number,
}

const ComponentMemorizado = ({fn, num, text}) => {
  return <button  onClick={() => fn(num)}>{text}</ button>
}
ComponentMemorizado.propTypes = {
  fn: p.func,
  text: p.string,
  num: p.number,
}
function App() {
  const [counter, setCounter] = useState(1);
  const [counter2, setCounter2] = useState(10);

  useEffect(() => {
    console.log(counter);
  }, [counter]);

  useEffect(() => {
  });

  const handleClick = useCallback((value)=>{
    setCounter((counter) => counter + value);
  }, []);

  const btn = useMemo( () =>  ComponentMemorizado(handleClick, 10, "fodaci"));

  return (
    <div className="App">
      <h1 id="myH1">Contador: {counter}</h1>
      <h1>Contador2: {counter2}</h1>

      <button onClick={() => setCounter(counter*2)}>NoIncrement</button>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <button onClick={() => setCounter2(counter2 + 2)}>Increment</button>
      <ComponentButton fn={handleClick} num={10} text="Mazio" />
      {useMemo(() => <ComponentButton fn={handleClick} num={10} text="Mazio" />)}
    </div>
  );
}

export default App;
