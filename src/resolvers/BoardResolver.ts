import { Mutation, Query, Resolver, Arg } from "type-graphql";
import { LoginRequired } from "../../middleware/loginRequired";
import { SuperAdmin } from "../../middleware/superAdmin";
import { Board, BoardInput } from "../models/Board";

@Resolver((of) => Board)
export default class BoardResolver {
  @Query((returns) => [Board])
  async getAllBoards() {
    return await Board.find();
  }

  @Query((returns) => Board)
  async getBoard(@Arg("boardId") boardId: string) {
    return await Board.findOne(boardId);
  }

  @LoginRequired()
  @SuperAdmin()
  @Mutation((returns) => Board)
  async createBoard(@Arg("boardData") boardData: BoardInput) {
    const newBoard = await Board.create(boardData).save();
    return newBoard;
  }

  @LoginRequired()
  @SuperAdmin()
  @Mutation((returns) => Boolean)
  async deleteBoard(@Arg("boardId") boardId: string) {
    const toDelete = await Board.findOne(boardId);
    await Board.remove([toDelete]);
    return true;
  }
}
