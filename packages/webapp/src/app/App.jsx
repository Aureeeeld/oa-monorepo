import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";

import { GlobalStyle } from "../shared";

import Pages from "../pages";
import store from "../store";

const App = () => (
  <Provider store={store}>
    <Normalize />
    <ThemeProvider theme={{ mode: "light" }}>
      <BrowserRouter>
        <GlobalStyle />
        <Pages />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

export default App;
