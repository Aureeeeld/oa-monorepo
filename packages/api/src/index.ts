import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import { UserResolver } from "./resolvers";

// * Load environment variables
import "./lib/env";

const port: number = parseInt(process.env.PORT!, 10);
const secretToken: string = process.env.SECRET_TOKEN!;

// * Bootstrap GraphQL Server & DB connection
async function bootstrapServer() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    authChecker: ({ context: { req } }) => {
      return req.headers.authorization === secretToken;
    },
    emitSchemaFile: false
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req })
  });

  createConnection()
    .then(() => {
      server.listen(port).then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
      });
    })
    .catch(e => {
      console.log("Couldn't connect to the database.");
      console.error(e);
    });
}

// * Start everything
bootstrapServer();