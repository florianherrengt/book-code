import { ApolloServerBase, gql } from "apollo-server-core";
import {
  createTestClient,
  ApolloServerTestClient
} from "apollo-server-testing";
import { buildSchema } from "type-graphql";
import { LinkResolver } from "./Link";
import { setLinkEntity } from "../../../containers";
import { Link } from "../../../entities";

describe("routers/GraphQL/Resolvers/Link", () => {
  let testClient: ApolloServerTestClient;
  beforeAll(async () => {
    // create a graphql schema with the resolver
    const schema = await buildSchema({
      resolvers: [LinkResolver]
    });
    // create a server to send requests to
    const server = new ApolloServerBase({ schema });
    // use the test client to send queries and mutations
    // more info https://www.apollographql.com/docs/apollo-server/testing/testing
    testClient = createTestClient(server);
  });
  describe("query/links", () => {
    it("should return the list of links in the database", async () => {
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
});
