import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    font-weight: normal;
  }
  
  html {
    font-size: 62.5%;
    font-family: Arial, sans-serif;
  }
  
  body {
    box-sizing: border-box;
  }
  

  /*
  viewport height
  */
  html body #root .App{
    min-height: 100vh;
  }

`;

export default GlobalStyles;
