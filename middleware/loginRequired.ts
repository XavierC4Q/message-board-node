import { createMethodDecorator } from "type-graphql";
import { User } from "../src/models/User";
import { AuthenticationError } from "apollo-server-express";

export function LoginRequired() {
  return createMethodDecorator<{ user: Partial<User> | null }>(
    async ({ context }, next) => {
      if (context.user) {
        return next();
      }
      throw new AuthenticationError("Login is required");
    }
  );
}
