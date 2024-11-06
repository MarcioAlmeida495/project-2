import styled from "styled-components";

export const StyledSelect = ({tam = undefined}) => styled.select`
  width: ${tam ? tam : '100%'};
  height: 30px;
  font-size: 16px;
`
