// Optamos em criar um global style para estilizar usando JS estilizaçoes
// padrões para o corpo geral do projeto com o box-sizing
//box-sizing: border-box serve para que possamos não se preocupar com as medidas

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; 
  }
  body {
    width: 100vw;
    height: 100vh;
    background-color: #f0f2f5;
    font-family: Poppins
  }
`

export default GlobalStyle;
