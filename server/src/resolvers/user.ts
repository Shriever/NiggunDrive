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
import { hash } from 'argon2';

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
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
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const { email, password } = options;
    if (email.length < 3) {
      return {
        errors: [
          {
            field: 'Email',
            message: 'Email must be at least 3 characters long.',
          },
        ],
      };
    }

    if (password.length < 3) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Password must be at least 3 characters long.',
          },
        ],
      };
    }

    const hashedPassword = await hash(password);
    try {
      const user = await User.create({
        email,
        password: hashedPassword,
      }).save();

      req.session.userId = user.id;

      return { user };
    } catch (error) {
      if (error.detail.includes('already exists')) {
        return {
          errors: [
            {
              field: 'email',
              message: 'An account already exists with that email address',
            },
          ],
        };
      }
    }
    return { errors: [{field: 'register', message: 'An unknown error has occurred'}]};
    }
  }

