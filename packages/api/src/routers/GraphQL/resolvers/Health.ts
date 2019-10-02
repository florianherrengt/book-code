import { Int, ObjectType, Query, Resolver, Field } from "type-graphql";

@ObjectType()
class Health {
  @Field(() => Int)
  ok: number;
}

@Resolver(of => Health)
class HealthResolver {
  @Query(returns => Health)
  async health(): Promise<Health> {
    return { ok: 1 };
  }
}

export { HealthResolver };
