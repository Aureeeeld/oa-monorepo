import { ApolloProvider } from "@apollo/react-hooks";
import * as React from "react";
import { Provider } from "react-redux";

// * Semantic UI Theme
import "semantic-ui-css/semantic.min.css";

// * Apollo GraphQL Client
import client from "../shared/graphql/client";

import Pages from "../pages";
import store from "../store";

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Pages />
    </Provider>
  </ApolloProvider>
);

export default App;
