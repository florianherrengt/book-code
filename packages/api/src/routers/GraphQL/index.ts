import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";

import { Router } from "express";

import { buildSchema } from "type-graphql";
import * as resolvers from "./resolvers";

import * as jwt from "jsonwebtoken";
import { config } from "../../config";
import { User } from "../../entities";

export interface GraphQLContext {
  user?: User;
}

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
      schema,
      context: ({ req }): GraphQLContext => {
        if (!req.headers.authorization) {
          return {};
        }
        if (req.headers.authorization.slice(0, 7).trim() !== "Bearer") {
          return {};
        }
        try {
          return {
            user: jwt.verify(
              req.headers.authorization.slice(7),
              config.jwtSecret
            ) as User
          };
        } catch (error) {
          return {};
        }
      }
    });
    apolloServer.applyMiddleware({ app: this.router, path: "/" });
  }
}
