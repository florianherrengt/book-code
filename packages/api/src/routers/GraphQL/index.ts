import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";

import { Router } from "express";

import { buildSchema } from "type-graphql";
import * as resolvers from "./resolvers";

export class GraphQLRouter {
  public readonly router = Router();
  constructor() {
    this.buildSchema();
  }
  async buildSchema() {
    const schema = await buildSchema({
      resolvers: Object.values(resolvers),
      validate: false
    });
    const apolloServer = new ApolloServer({
      schema
    });
    apolloServer.applyMiddleware({ app: this.router, path: "/" });
  }
}
