import { Query, Resolver } from "type-graphql";
import { LoginRequired } from "../../middleware/loginRequired";
import { Board } from "../models/Board";

@Resolver((of) => Board)
export default class BoardResolver {
  @LoginRequired()
  @Query((returns) => [Board])
  async getAllBoards() {
    return await Board.find();
  }
}
