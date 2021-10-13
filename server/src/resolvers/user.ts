import {
  Resolver,
  Ctx,
  Query,
  Mutation,
  ObjectType,
  Field,
  Arg,
} from 'type-graphql';
import { MyContext } from '../types';
import { User } from '../entities/User';
import { UsernamePasswordInput } from './UsernamePasswordInput';

@ObjectType()
class FieldError {
    @Field()
    field: string;

    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[]

    @Field(() => User, {nullable: true})
    user?: User;
}

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }

    return User.findOne(req.session.userId);
  }

  @Mutation(() => UserResponse)
  async register(@Arg("options") options: UsernamePasswordInput, @Ctx() {req}: MyContext) {
      const errors
  }
}
