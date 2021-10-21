import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import { Like } from './Like';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: 'text', unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ nullable: true })
  isAdmin?: boolean;

  @OneToMany(() => Like, like => like.user)
  likes: Like[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}