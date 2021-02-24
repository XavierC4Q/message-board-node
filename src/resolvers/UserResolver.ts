import { Resolver, Query } from "type-graphql";
import { User } from "../schema/User";

@Resolver((of) => User)
export default class UserResolver {
  @Query((returns) => [String])
  getUsers() {
    return ["Hello", "World"];
  }
}
