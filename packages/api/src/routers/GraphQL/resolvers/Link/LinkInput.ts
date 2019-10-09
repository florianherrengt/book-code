import { InputType, Field } from "type-graphql";
import { Link } from "../../../../entities";

@InputType()
class LinkInput implements Partial<Link> {
  @Field()
  uri: string;
}

export { LinkInput };
