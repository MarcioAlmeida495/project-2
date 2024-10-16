
import { useState } from "react";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Templates/Home/Home";
import ItensManager from "./Templates/ItensTable/ItensManager";

export default function App () {
  const [page, setPage] = useState(0);
  const changeTemplate = (index) => {
    setPage(index);
  }
  return (
    <div>
      <NavBar changeTemplate={changeTemplate}/>
      { page==0 && <Home />}
      { page==1 && <ItensManager />}
      { page==2 && <h1>Page3</h1>}
    </div>
  )
}

