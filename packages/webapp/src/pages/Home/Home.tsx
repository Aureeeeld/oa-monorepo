import * as React from "react";
import ApolloClient, { gql } from "apollo-boost";

// * Load environment variables
import "../../lib/env";

const apiUrl: string = process.env.API_URL!;

const client = new ApolloClient({
  uri: apiUrl
});

client
  .query({
    query: gql`
      {
        users {
          id
          name
        }
      }
    `
  })
  .then(result => console.log(result));

const Home = () => <h1>Home</h1>;

export default Home;
