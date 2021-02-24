import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import UserResolver from "./resolvers/UserResolver";
import { User } from "./models/User";

const IS_TEST = process.env.NODE_ENV === "test";

async function main() {
  const options: any = {
    type: "postgres",
    host: "localhost",
    port: "5432",
    username: "postgres",
    password: "9!october",
    synchronize: true,
    logging: false,
    database: IS_TEST ? "message-board-node-test" : "message-board-node-dev",
    entities: [User],
    name: IS_TEST ? "test" : "default",
  };

  await createConnection(options);

  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: true,
  });

  const app = Express();

  const server = new ApolloServer({
    schema,
  });

  server.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log("Server is running on http://localhost:4000/graphql")
  );
}

main();
