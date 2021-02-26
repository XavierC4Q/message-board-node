import { ObjectType, Field, ID, InputType } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { Length } from "class-validator";
import { UserRole } from "../types/enums";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("varchar", { unique: true })
  email: string;

  @Field()
  @Column("varchar")
  password: string;

  @Field((type) => UserRole)
  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.STANDARD,
  })
  role: UserRole;

  @Field()
  @Column("varchar", { unique: true })
  displayName: string;

  @Field()
  @CreateDateColumn()
  joined: Date;
}

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field((type) => UserRole)
  role?: UserRole;

  @Field()
  @Length(3, 30)
  displayName: string;
}

@ObjectType()
export class UserAuthResponse {
  @Field((type) => User)
  user: Partial<User>;

  @Field((type) => String)
  token: string;
}
