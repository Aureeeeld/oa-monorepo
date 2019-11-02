import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "oa-theme";

import Pages from "../pages";
import store from "../store";

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={{ mode: "light" }}>
      <BrowserRouter>
        <GlobalStyle />
        <Pages />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

export default App;
