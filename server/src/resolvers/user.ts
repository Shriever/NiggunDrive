import {
  Resolver,
  Ctx,
  Query,
  Mutation,
  ObjectType,
  Field,
  Arg,
} from 'type-graphql';
import { MyContext, UserParams } from '../types';
import { User } from '../entities/User';
import { UsernamePasswordInput } from './UsernamePasswordInput';
import { hash, verify } from 'argon2';
import { COOKIE_NAME } from '../constants';

@ObjectType()
export class FieldError {
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
  async me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }

    const user = await User.findOne(req.session.userId);
    if (!user) {
      return null;
    }
    user.isAdmin = user.isAdmin ? true : false;

    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const { email, password, adminKey } = options;

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
    const userParams: UserParams = {
      email,
      password: hashedPassword,
    };
    console.log(adminKey, process.env.ADMIN_KEY);

    if (adminKey === process.env.ADMIN_KEY) {
      userParams.isAdmin = true;
    } else if (adminKey !== '') {
      return {
        errors: [
          {
            field: 'email',
            message: 'Admin key is incorrect.',
          },
        ],
      };
    }

    try {
      const user = await User.create(userParams).save();

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
    return {
      errors: [{ field: 'password', message: 'An unknown error has occurred' }],
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const { email, password } = options;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return {
        errors: [
          { field: 'password', message: 'Email and password are incorrect.' },
        ],
      };
    }

    const isValid = await verify(user.password, password);

    if (!isValid) {
      return {
        errors: [
          { field: 'password', message: 'Email and password are incorrect.' },
        ],
      };
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise(resolve => {
      req.session.destroy(error => {
        res.clearCookie(COOKIE_NAME);

        if (error) {
          resolve(false);
          return;
        }

        resolve(true);
      });
    });
  }
}
