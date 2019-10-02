import { Resolver, Query, ObjectType, Args } from "type-graphql";
import { Link } from "../../../entities";
import { getLinkEntity } from "../../../containers";
import { PaginatedResponse } from "../helpers";
import { PaginatedArgs } from "../helpers/PaginatedArgs";

@ObjectType()
class PaginatedLink extends PaginatedResponse(Link) {}

@Resolver(of => PaginatedLink)
class LinkResolver {
  private readonly _LinkEntity = getLinkEntity();
  @Query(returns => PaginatedLink)
  async links(@Args() { limit = 20, offset = 0 }: PaginatedArgs): Promise<
    PaginatedLink
  > {
    const {
      rows: items,
      count: total
    } = await this._LinkEntity.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]]
    });
    return { items, total, hasMore: offset + items.length <= total };
  }
}

export { LinkResolver };
