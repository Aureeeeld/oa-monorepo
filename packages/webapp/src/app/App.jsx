import { ApolloProvider } from "@apollo/react-hooks";
import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Dimmer, Loader } from "semantic-ui-react";

// * Semantic UI Theme
import "semantic-ui-css/semantic.min.css";

// * Apollo GraphQL Client
import client from "../shared/graphql/client";

import Pages from "../pages";
import { store, persistor } from "../store";

const Loading = (
  <Dimmer active>
    <Loader />
  </Dimmer>
);

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate loading={Loading} persistor={persistor}>
        <Pages />
      </PersistGate>
    </Provider>
  </ApolloProvider>
);

export default App;
