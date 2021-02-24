import { ObjectType, Field, ID, InputType } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Length } from "class-validator";
import { UserRole } from "../types/enums";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column("varchar")
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
  @Column("varchar")
  displayName: string;

  @Field()
  @Column("varchar")
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
