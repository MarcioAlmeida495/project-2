import { useEffect, useRef, useState } from "react";
import './styles.css';
var counter  = 0;
function ordenarSemMaiusculas(array) {
  return array.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
}
export default function ClientsSection () {
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const sectionRef = useRef(null);
  useEffect(()=>{
    console.log('teste')
    sectionRef.current.className = open ? 'ClientsSection Open' : 'ClientsSection Close';
  }, [open]);
  useEffect(()=>{
    fetch('http://localhost/fetchControle').then(r=>r.json().then(r=>{
      const arr = r.split(/\n|\r/);
      const sortArr = ordenarSemMaiusculas(arr);
      setClients(sortArr);
    }));
  }, [])

  useEffect(()=>{
    console.log(clients);
  }, [clients])

  const Open = () => {
    setOpen((o)=>!o);
  }
  return <section ref={sectionRef} className={'ClientsSection'} >
    <button style={{float:'right'}} onClick={Open} >x</button>
    {clients.map((client)=>{
      if(client.length > 0){
        counter++;
        return <button className="clientsButton" key={counter}>{client}</button>
      }
    })}
  </section>;
}
