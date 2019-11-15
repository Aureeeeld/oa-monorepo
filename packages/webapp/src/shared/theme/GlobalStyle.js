import { createGlobalStyle } from "styled-components";

import theme from "./theme";

// * Assets
import Kayak from "../../assets/fonts/KayakSansRegular.otf";

const { backgroundColor, textColor } = theme;

const GlobalStyle = createGlobalStyle`

@font-face {
    font-family: 'Kayak';
    src: url(${Kayak});
    font-weight: normal;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-size: .8125rem;
    background-color: ${backgroundColor};
    color: ${textColor};
  }
`;

export default GlobalStyle;
