import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Like } from './Like';

@ObjectType()
@Entity()
export class Niggun extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  title!: string;

  @Field()
  @Column()
  link!: string;

  @Field()
  @Column()
  length!: number;

  @Field(() => Boolean)
  isLiked: boolean;

  @OneToMany(() => Like, like => like.niggun)
  likes: Like[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
