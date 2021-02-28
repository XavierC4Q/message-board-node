import { Length } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
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
  @Length(1, 50)
  name: string;

  @Field()
  @Column("varchar")
  @Length(1, 200)
  description: string;

  @Field()
  @Column("varchar", { unique: true })
  @Length(1, 50)
  topic: string;

  @Field()
  @CreateDateColumn()
  created: Date;
}

