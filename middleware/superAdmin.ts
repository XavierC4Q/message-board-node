import { AuthenticationError } from "apollo-server-express";
import { createMethodDecorator } from "type-graphql";
import { User } from "../src/models/User";
import { UserRole } from "../src/types/enums";

export function SuperAdmin() {
  return createMethodDecorator<{ user: Partial<User> }>(
    async ({ context }, next) => {
      if (context.user.role === UserRole.SUPER_ADMIN) {
        return next();
      }

      throw new AuthenticationError("Super admin is required");
    }
  );
}
