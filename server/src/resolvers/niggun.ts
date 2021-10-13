import { Niggun } from "src/entities/Niggun";
import { MyContext } from "src/types";
import { Ctx, FieldResolver, Mutation, Resolver, Root } from "type-graphql";



@Resolver(Niggun)
export class NiggunResolver {
    // @FieldResolver(() => Boolean, {nullable: true})
    // async isLiked(@Root() niggun: Niggun, @Ctx() { req}: MyContext)

    @Mutation(() => Boolean)
    
}