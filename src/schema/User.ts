import { ObjectType, Field, ID, InputType } from "type-graphql";
import {Length} from 'class-validator';
import { UserRole } from "../types/enums";

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field((type) => UserRole)
  role: UserRole;

  @Field()
  displayName: string;

  @Field()
  joined: Date;
}

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field((type) => UserRole)
  role: UserRole;

  @Field()
  @Length(3, 30)
  displayName: string;
}
