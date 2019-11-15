import "reflect-metadata";
import express from "express";
import session from "express-session";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import passport from "passport";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

// * Resolvers
import { UserResolver } from "./resolvers";

// * Routes
import discordRouter from "./routes/discord-auth";
import indexRouter from "./routes/index";

// * Utils
import { initSocket } from "./utils/discordAuth/socket";

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

  // * App & server
  const app = express();
  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req })
  });

  // * Setup middlewares
  app.use(cors());
  app.use(passport.initialize());
  app.use(passport.session());
  server.applyMiddleware({ app, cors: true });

  // * Init session
  app.use(
    session({
      secret: secretToken,
      resave: true,
      saveUninitialized: true
    })
  );

  // * Wire up routes
  app.use("/", indexRouter);
  app.use("/discord/auth", discordRouter);

  // * Create the connection
  createConnection()
    .then(() => {
      const appServer = app.listen({ port }, () =>
        console.log(`🚀 Server ready at http://localhost:${port}`)
      );

      // * Initiate socket for Auth
      initSocket(appServer);
    })
    .catch(e => {
      console.log("Couldn't connect to the database.");
      console.error(e);
    });
}

// * Start everything
bootstrapServer();
