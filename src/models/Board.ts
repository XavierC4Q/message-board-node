import { Length } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class Board extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("varchar", { unique: true })
  name: string;

  @Field()
  @Column("varchar")
  description: string;

  @Field()
  @Column("varchar", { unique: true })
  topic: string;

  @Field()
  @CreateDateColumn()
  created: Date;
}

@InputType()
export class BoardInput implements Partial<Board> {
  @Field((type) => String)
  @Length(1, 50)
  name: string;

  @Field((type) => String)
  @Length(1, 200)
  description: string;

  @Field((type) => String)
  @Length(1, 50)
  topic: string;
}
