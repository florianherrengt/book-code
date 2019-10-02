import { ApolloServerBase, gql } from "apollo-server-core";
import {
  createTestClient,
  ApolloServerTestClient
} from "apollo-server-testing";
import { buildSchema } from "type-graphql";
import { LinkResolver } from "./Link";
import { setLinkEntity } from "../../../../containers";
import { Link } from "../../../../entities";

describe("routers/GraphQL/Resolvers/Link", () => {
  describe("query/links", () => {
    it("should return the list of links in the database", async () => {
      // create a graphql schema with the resolver
      const schema = await buildSchema({
        resolvers: [LinkResolver]
      });
      // create a server to send requests to
      const server = new ApolloServerBase({
        schema,
        context: { user: { id: "userid" } }
      });
      // use the test client to send queries and mutations
      // more info https://www.apollographql.com/docs/apollo-server/testing/testing
      const testClient = createTestClient(server);

      // mock sequelize
      const findAndCountAll = jest.fn();
      const fakeLink = { id: "1", uri: "http://test" };
      findAndCountAll.mockResolvedValue({ rows: [fakeLink], count: 1 });
      setLinkEntity(({ findAndCountAll } as unknown) as typeof Link);

      // send the query
      const { data, errors } = await testClient.query({
        query: gql`
          {
            links {
              items {
                id
                uri
              }
              total
            }
          }
        `
      });

      // assert results
      expect(errors).toBeUndefined();
      expect(data!.links.items).toHaveLength(1);
      expect(data!.links.items[0]).toMatchObject(fakeLink);
      expect(data!.links.hasMore).toBeFalsy();
    });
  });
  describe("mutation/addLink", () => {
    it("should add a link", async () => {
      const schema = await buildSchema({
        resolvers: [LinkResolver]
      });
      const server = new ApolloServerBase({
        schema,
        context: { user: { id: "userid" } }
      });
      const testClient = createTestClient(server);

      // mock sequelize
      const create = jest.fn();
      const fakeLink = { uri: "http://test" };
      create.mockResolvedValue({ id: "1", ...fakeLink, userId: "userid" });
      setLinkEntity(({ create } as unknown) as typeof Link);

      // send the mutation
      const { data, errors } = await testClient.mutate({
        mutation: gql`
          mutation signIn($input: LinkInput!) {
            addLink(input: $input) {
              id
              uri
              userId
            }
          }
        `,
        variables: { input: fakeLink }
      });

      // assert results
      expect(errors).toBeUndefined();
    });
  });
});
