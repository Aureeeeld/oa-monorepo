import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
    margin: 0;
    font-size: .8125rem;
    background: transparent
  }
`;

export default GlobalStyle;
