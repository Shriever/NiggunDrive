import { Niggun } from '../entities/Niggun';
import {
  Arg,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { isAuth } from '../middleware/isAuth';

@InputType()
class NiggunInput {
  @Field()
  title: string;
}

@Resolver(Niggun)
export class NiggunResolver {
  // @FieldResolver(() => Boolean, {nullable: true})
  // async isLiked(@Root() niggun: Niggun, @Ctx() { req}: MyContext)

  //   @Mutation(() => Boolean)
  //   @UseMiddleware(isAuth)
  //   async like(
  //     @Arg('niggunId', () => Int) niggunId: number,
  //     @Arg('isLiked', () => Boolean) isLiked: boolean,
  //     @Ctx() { req }: MyContext
  //   ) {
  //     const { userId } = req.session;

  //     // user is unliking a niggun
  //     if (isLiked) {
  //       Like.delete({});
  //     }
  //   }

  @Query(() => [Niggun])
  async niggunim(): Promise<Niggun[]> {
    const niggunim = await Niggun.find();

    return niggunim;
  }

  @Mutation(() => Niggun)
  @UseMiddleware(isAuth)
  uploadNiggun(@Arg('input') input: NiggunInput) {
    return Niggun.create({ ...input });
  }
}
