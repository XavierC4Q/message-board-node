import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql";
import { User, UserInput, UserAuthResponse } from "../models/User";
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { ApolloError, UserInputError } from "apollo-server-express";
import { Context } from "../types/index";

@Resolver((of) => User)
export default class UserResolver {
  @Query((returns) => [User])
  async getAllUsers(): Promise<User[]> {
    return await User.find();
  }

  @Query((returns) => User)
  async getUser(@Arg("uid") uid: string) {
    return await User.findOne(uid);
  }

  @Query((returns) => User || null)
  async getCurrentUser(@Ctx() ctx: Context) {
    return ctx.user || null;
  }

  @Mutation((returns) => UserAuthResponse)
  async signUpUser(
    @Arg("userData") userData: UserInput
  ): Promise<UserAuthResponse> {
    try {
      const salt = genSaltSync(10);
      const hash = hashSync(userData.password, salt);
      const newUser = User.create({ ...userData, password: hash });
      await newUser.save();

      const authUser = {
        displayName: newUser.displayName,
        email: newUser.email,
        id: newUser.id,
        joined: newUser.joined,
        role: newUser.role,
      };

      const genToken = sign(authUser, "app_secret", {
        expiresIn: "1y",
        algorithm: "HS256",
      });

      return {
        user: authUser,
        token: genToken,
      };
    } catch (e) {
      console.error(e);
      throw new UserInputError("Failed to sign up new user", {
        invalidArgs: Object.keys(userData),
      });
    }
  }

  @Mutation((returns) => UserAuthResponse)
  async signInUser(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    try {
      const findUser = await User.findOne({ email });

      if (!findUser) {
        throw new ApolloError(
          "No user found with email/password combination",
          "404"
        );
      }

      const correctPassword = compareSync(password, findUser.password);

      if (!correctPassword) {
        throw new ApolloError(
          "No user found with email/password combination",
          "400"
        );
      }

      const authUser = {
        displayName: findUser.displayName,
        email: findUser.email,
        id: findUser.id,
        joined: findUser.joined,
        role: findUser.role,
      };

      const genToken = sign(authUser, "app_secret", {
        expiresIn: "1y",
        algorithm: "HS256",
      });

      return {
        user: authUser,
        token: genToken,
      };
    } catch (e) {
      console.error(e);
      throw new UserInputError("Failed to sign in user", {
        invalidArgs: [email, password],
      });
    }
  }
}
