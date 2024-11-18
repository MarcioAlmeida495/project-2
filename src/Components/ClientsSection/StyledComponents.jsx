import styled from "styled-components";

export const StyledDivButtonClientSection = () => styled.div`
  width: 100%;
  height: 55px;
  box-sizing: border-box;
`
export const StyledButtonInClientSection = () => styled.button`
  width: 5%;
  float: right;
  border: none;
  height: 40px;
  box-sizing: border-box;
  background-color: #007baa;

  &:hover {
    background-color: #555;
    cursor: pointer;
  }

`

export const StylesProvider = () => styled.div`
&.ClientsSection{
  float: left;
  width: 250px;
  height: 94vh;
  box-shadow: 1px 1px 5px black;
  overflow: auto;
  box-sizing: border-box;
}
&.clientsButton{
  background-color: #007bff; /* Cor de fundo do botão */
  margin: 0px;
  height: 40px;
  width: 95%;
  color: white;              /* Cor do texto */
  padding: 10px 20px;        /* Espaçamento interno */
  font-size: 15px;           /* Tamanho da fonte */
  border: none; /* Borda com uma tonalidade mais escura */       /* Bordas arredondadas */
  cursor: pointer;           /* Cursor de mãozinha ao passar */
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}
&.clientsButton:hover{
  background-color: #0056b3; /* Cor de fundo mais escura no hover */
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.5); /* Sombra ao passar o mouse */
}
&.Open{
  animation: slideSlowly 200ms ease-in-out forwards;
}
&.Close{
  animation: slideSlowly-left 200ms ease-in-out forwards;
}
@keyframes slideSlowly{
  0%{
    width: 100px;
  }
  100%{
    width: 250px;
  }
}
@keyframes slideSlowly-left{
  0%{
    width: 250px;
  }
  100%{
    width: 25px;
    border: none;
    box-shadow: none;
  }
}

`
