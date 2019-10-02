import {
  Resolver,
  Query,
  ObjectType,
  Args,
  Mutation,
  Arg,
  Ctx
} from "type-graphql";
import { Link } from "../../../../entities";
import { getLinkEntity } from "../../../../containers";
import { PaginatedResponse } from "../../helpers";
import { PaginatedArgs } from "../../helpers/PaginatedArgs";
import { GraphQLContext } from "../..";
import { LinkInput } from "./LinkInput";

@ObjectType()
class PaginatedLink extends PaginatedResponse(Link) {}

@Resolver(of => PaginatedLink)
class LinkResolver {
  private readonly _LinkEntity = getLinkEntity();
  @Query(returns => PaginatedLink)
  async links(
    @Args() { limit = 20, offset = 0 }: PaginatedArgs,
    @Ctx() context: GraphQLContext
  ): Promise<PaginatedLink> {
    if (!context.user) {
      return {
        items: [],
        total: 0,
        hasMore: false
      };
    }
    const {
      rows: items,
      count: total
    } = await this._LinkEntity.findAndCountAll({
      where: {
        userId: context.user.id
      },
      limit,
      offset,
      order: [["createdAt", "DESC"]]
    });
    return { items, total, hasMore: offset + items.length <= total };
  }
  @Mutation(returns => Link)
  async addLink(
    @Arg("input") input: LinkInput,
    @Ctx() context: GraphQLContext
  ): Promise<Link> {
    if (!context.user) {
      throw new Error("Unauthorised");
    }
    const link = await this._LinkEntity.create({
      ...input,
      userId: context.user.id
    });
    return link;
  }
}

export { LinkResolver };
