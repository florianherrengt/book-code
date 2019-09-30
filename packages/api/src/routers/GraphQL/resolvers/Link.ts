import { Resolver, Query } from "type-graphql";
import { Link } from "../../../entities";
import { getLinkEntity } from "../../../containers";

@Resolver(of => Link)
class LinkResolver {
  private readonly _LinkEntity = getLinkEntity();
  @Query(returns => [Link])
  async links(): Promise<Link[]> {
    const links = this._LinkEntity.findAll();
    return links;
  }
}

export { LinkResolver };
