import "reflect-metadata";
import * as dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import UserResolver from "./resolvers/UserResolver";
import { User } from "./models/User";
import * as jwt from "express-jwt";

const IS_TEST = process.env.NODE_ENV === "test";
const DB = IS_TEST ? process.env.TEST_DB_NAME : process.env.DB_NAME

async function main() {
  const options: any = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: false,
    database: DB,
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
    context: ({ req }) => ({
      ...req,
      user: req.user,
    }),
  });

  app.use(
    "/graphql",
    jwt({ secret: "some-secret-secret", algorithms: ["HS256"] })
  );

  server.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log("Server is running on http://localhost:4000/graphql")
  );
}

main();
