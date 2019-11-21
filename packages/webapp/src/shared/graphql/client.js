import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";

// * Load environment variables
const { REACT_APP_GQL_ENDPOINT, REACT_APP_API_SECRET } = process.env;

export default new ApolloClient({
  cache: new InMemoryCache(),
  uri: REACT_APP_GQL_ENDPOINT,
  request: operation => {
    operation.setContext({
      headers: {
        authorization: REACT_APP_API_SECRET
      }
    });
  }
});
