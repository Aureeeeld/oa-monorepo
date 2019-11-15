import ApolloClient from "apollo-boost";

// * Load environment variables
const { REACT_APP_GQL_ENDPOINT, REACT_APP_API_SECRET } = process.env;

export default new ApolloClient({
  uri: REACT_APP_GQL_ENDPOINT,
  request: operation => {
    operation.setContext({
      headers: {
        authorization: REACT_APP_API_SECRET
      }
    });
  }
});
