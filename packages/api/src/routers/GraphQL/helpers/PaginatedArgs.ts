import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
class PaginatedArgs {
  @Field(type => Int, { nullable: true })
  offset?: number;

  @Field(type => Int, { nullable: true })
  limit?: number;
}

export { PaginatedArgs };
