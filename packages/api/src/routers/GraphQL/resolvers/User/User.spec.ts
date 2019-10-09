import { ApolloServerBase, gql } from "apollo-server-core";
import { createTestClient } from "apollo-server-testing";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./User";
import { setUserEntity } from "../../../../containers";
import { User } from "../../../../entities";
import { HealthResolver } from "..";
import * as jwt from "jsonwebtoken";

describe("routers/GraphQL/Resolvers/User", () => {
  describe("mutation/signIn", () => {
    it("should return a jwt for this user", async () => {
      const schema = await buildSchema({
        resolvers: [HealthResolver, UserResolver]
      });
      const server = new ApolloServerBase({ schema });
      const testClient = createTestClient(server);
      const user = { emailAddress: "test1@mock.com", password: "123" };
      const findOne = jest.fn();
      findOne.mockResolvedValue({ ...user, id: "userid" });
      setUserEntity(({ findOne } as unknown) as typeof User);

      const { data, errors } = await testClient.mutate({
        mutation: gql`
          mutation signIn($input: UserAuthInput!) {
            signIn(input: $input) {
              id
              emailAddress
              jwt
            }
          }
        `,
        variables: { input: user }
      });
      expect(errors).toBeUndefined();
      expect(data!.signIn).toMatchObject({
        id: "userid",
        emailAddress: user.emailAddress
      });
      expect(jwt.decode(data!.signIn.jwt)).toMatchObject({ id: "userid" });
    });
  });
  describe("mutation/signUp", () => {
    it("should create a user and return the jwt", async () => {
      const schema = await buildSchema({
        resolvers: [HealthResolver, UserResolver]
      });
      const server = new ApolloServerBase({ schema });
      const testClient = createTestClient(server);
      const user = { emailAddress: "test2@mock.com", password: "123" };
      const findOne = jest.fn();
      const create = jest.fn();
      create.mockResolvedValue({ id: "userid", ...user });
      findOne.mockResolvedValue(null);
      setUserEntity(({ findOne, create } as unknown) as typeof User);

      const { data, errors } = await testClient.mutate({
        mutation: gql`
          mutation signUp($input: UserAuthInput!) {
            signUp(input: $input) {
              id
              emailAddress
              jwt
            }
          }
        `,
        variables: { input: user }
      });
      expect(errors).toBeUndefined();
      expect(data!.signUp).toMatchObject({
        id: "userid",
        emailAddress: user.emailAddress
      });
      expect(jwt.decode(data!.signUp.jwt)).toMatchObject({ id: "userid" });
    });
  });
});
