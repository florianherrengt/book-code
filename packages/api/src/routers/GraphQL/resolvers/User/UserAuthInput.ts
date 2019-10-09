import { InputType, Field } from "type-graphql";

@InputType()
class UserAuthInput {
  @Field()
  emailAddress: string;

  @Field()
  password: string;
}

export { UserAuthInput };
