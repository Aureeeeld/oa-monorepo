import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import { UserResolver } from "./resolvers";

// * Load environment variables
import "./lib/env";

const port: number = parseInt(process.env.PORT!, 10);

async function bootstrapServer() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: false
  });

  const server = new GraphQLServer({
    schema
  });

  createConnection()
    .then(() => {
      server.start(() =>
        console.log(`🚀 Server is running on http://localhost:${port}`)
      );
    })
    .catch(e => {
      console.log("Couldn't connect to the database.");
      console.error(e);
    });
}

bootstrapServer();
