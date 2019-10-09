import { Int, ObjectType, Query, Resolver, Field, Ctx } from "type-graphql";
import { GraphQLContext } from "..";

@ObjectType()
class Health {
  @Field(() => Int)
  ok: number;
}

@Resolver(of => Health)
class HealthResolver {
  @Query(returns => Health)
  async health(@Ctx() context: GraphQLContext): Promise<Health> {
    console.log({ context });
    return { ok: 1 };
  }
}

export { HealthResolver };
