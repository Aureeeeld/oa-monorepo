import { createGlobalStyle } from "styled-components";

import { backgroundColor, textColor } from "./theme";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${backgroundColor};
    font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
    color: ${textColor};
  }
`;

export default GlobalStyle;
