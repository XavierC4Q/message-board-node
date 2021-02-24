import { Resolver, Query } from "type-graphql";
import { User } from '../models/User';

@Resolver((of) => User)
export default class UserResolver {
  @Query((returns) => [User])
  async getAllUsers() {
    return await User.find();
  }
}
