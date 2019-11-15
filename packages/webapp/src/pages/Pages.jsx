import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";

// * Components
import Header from "../components/Header";

// * Style
import { GlobalStyle } from "../shared";

// * Pages
import Home from "./Home";

// * Styled components
const Content = styled.div`
  padding-top: 68px;
  padding-left: 88px;
  min-height: 100vh;
`;

const Pages = () => {
  // * Selectors
  const mode = useSelector(({ theme }) => theme.mode);

  return (
    <>
      <ThemeProvider theme={{ mode }}>
        <>
          <Normalize />
          <GlobalStyle />
        </>
        <BrowserRouter>
          <Header />
          <Content>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </Content>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default Pages;
