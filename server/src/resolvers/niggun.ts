import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Niggun } from '../entities/Niggun';
import { isAuth } from '../middleware/isAuth';
import { configureS3 } from '../utils/configureS3';
import { generateRandomString } from '../utils/generateRandomString';
import { FieldError } from './user';

@InputType()
class NiggunInput {
  @Field()
  title: string;

  @Field()
  link: string;
}

@ObjectType()
class AwsUrl {
  @Field()
  uploadUrl: string;
}

@ObjectType()
class NiggunResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Niggun, { nullable: true })
  niggun?: Niggun;
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

  @Query(() => AwsUrl)
  @UseMiddleware(isAuth)
  async getAWSUploadUrl(): Promise<AwsUrl> {
    const imageName = await generateRandomString();
    const bucketName = 'niggunbucket';
    const s3 = configureS3();

    const params = {
      Bucket: bucketName,
      Key: imageName,
      Expires: 60,
    };

    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);

    return { uploadUrl };
  }

  @Mutation(() => NiggunResponse)
  @UseMiddleware(isAuth)
  async uploadNiggun(
    @Arg('input') input: NiggunInput
  ): Promise<NiggunResponse> {
    try {
      const niggun = await Niggun.create(input).save();

      return { niggun };
    } catch {
      return { errors: [{ field: 'title', message: 'Title already exists.' }] };
    }
  }
}
