
import { useEffect, useRef, useState } from "react";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Templates/Home/Home";
import ItensManager from "./Templates/ItensTable/ItensManager";
import { styledScrollBar } from "./StyledComponents";
import { ItensContextProvider } from "./Contexts/ItensContexts";
const ScrollBarStyle = styledScrollBar();
export default function App () {
  const [page, setPage] = useState(0);
  const homeRef = useRef(null);
  const [homeStore, setHomeStore] = useState();

  useEffect(()=>{
    setHomeStore(<Home onUnMount={setHomeStore} />)
  }, [])
  const changeTemplate = (index) => {
    console.log(homeRef);
    setPage(index);
  }
  return (
    <ScrollBarStyle>
      <NavBar changeTemplate={changeTemplate}/>
      { page==0 && homeStore}
      { page==1 && <ItensContextProvider><ItensManager /></ItensContextProvider>}
      { page==2 && <h1>Page3</h1>}
    </ScrollBarStyle>
  )
}

