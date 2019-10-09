import { Resolver, Query, Mutation, Arg } from "type-graphql";
import * as bcrypt from "bcryptjs";
import { User } from "../../../../entities";
import { getUserEntity } from "../../../../containers";
import { UserAuthInput } from "./UserAuthInput";
import * as jwt from "jsonwebtoken";
import { config } from "../../../../config";

@Resolver(of => User)
class UserResolver {
  private readonly _UserEntity = getUserEntity();
  @Mutation(returns => User)
  async signIn(@Arg("input")
  {
    emailAddress,
    password
  }: UserAuthInput): Promise<User> {
    const user = await this._UserEntity.findOne({ where: { emailAddress } });
    if (!user) {
      throw new Error("User not found");
    }
    if (!bcrypt.compare(password, user.password)) {
      throw new Error("Invalid password");
    }
    user.jwt = jwt.sign({ id: user.id }, config.jwtSecret);
    return user;
  }
  @Mutation(returns => User)
  async signUp(@Arg("input")
  {
    emailAddress,
    password
  }: UserAuthInput): Promise<User> {
    if (await this._UserEntity.findOne({ where: { emailAddress } })) {
      throw new Error("User with this email address already exists.");
    }
    const salt = bcrypt.genSaltSync(10);
    try {
      const user = await this._UserEntity.create({
        emailAddress,
        password: bcrypt.hashSync(password, salt)
      });
      user.jwt = jwt.sign({ id: user.id }, config.jwtSecret);
      return user;
    } catch (error) {
      console.error("Cannot create user.", error);
      throw error;
    }
  }
}

export { UserResolver };
