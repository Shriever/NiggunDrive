import { Like } from '../entities/Like';
import { MyContext } from 'src/types';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
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
import { getConnection } from 'typeorm';

@InputType()
class NiggunInput {
  @Field()
  title: string;

  @Field()
  link: string;

  @Field()
  length: number;
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
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async like(
    @Arg('niggunId', () => Int) niggunId: number,
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session;

    const like = await Like.findOne({ where: { userId, niggunId } });

    if (like) {
      Like.delete({ userId, niggunId });
    } else {
      Like.insert({ userId, niggunId });
    }
    return true;
  }

  @Query(() => [Niggun])
  @UseMiddleware(isAuth)
  async likedNiggunim(@Ctx() { req }: MyContext): Promise<Niggun[]> {
    const { userId } = req.session;

    const niggunim = await getConnection().query(
      `
    select n.*,
    (select "niggunId" from "like" where "userId" = $1 and "niggunId" = n.id) "isLiked"
    from niggun n
    where id in (select "niggunId" from "like" where "userId" = $1)
    `,
      [userId]
    );

    console.log(niggunim);
    

    return niggunim;
  }

  @Query(() => [Niggun])
  async niggunim(@Ctx() { req }: MyContext): Promise<Niggun[]> {
    const { userId } = req.session;

    const niggunim = await getConnection().query(
      `
      select n.*,
      ${
        userId
          ? '(select "niggunId" from "like" where "userId" = $1 and "niggunId" = n.id) "isLiked"'
          : 'false as "isLiked"'
      }
      from niggun n
      order by n."createdAt" DESC
    `,
      [userId]
    );
    console.log(niggunim);

    return niggunim;
  }

  @Query(() => AwsUrl)
  @UseMiddleware(isAuth)
  async getAWSUploadUrl(): Promise<AwsUrl> {
    const imageName = generateRandomString();
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
    } catch (err) {
      return { errors: [{ field: 'title', message: 'Title already exists.' }] };
    }
  }
}
