
import { useState } from "react";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Templates/Home/Home";

export default function App () {
  const [page, setPage] = useState(0);
  const changeTemplate = (index) => {
    setPage(index);
  }
  return (
    <>
      <NavBar changeTemplate={changeTemplate}/>
      { page==0 && <Home />}
      { page==1 && <h1>CashManager</h1>}
      { page==2 && <h1>Page3</h1>}
    </>
  )
}

