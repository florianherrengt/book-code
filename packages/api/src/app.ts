import * as express from "express";
import fetch from "node-fetch";
import { setFetch } from "./containers";
import { EmojiRouter, GraphQLRouter } from "./routers";
import * as helmet from "helmet";
import { RateLimiterMiddleware } from "./middlewares";
import { sequelize } from "./sequelize";
import { createUmzug } from "./migrate";

export const bootstrap = async () => {
  setFetch(fetch);
  const umzug = createUmzug(sequelize);
  try {
    await umzug.up();
  } catch (e) {
    console.error("Migration failed.", e);
    await umzug.down();
    process.exit(1);
  }
  await sequelize.sync({ force: true });
};

export const createApp = () => {
  const app = express();
  app.use(new RateLimiterMiddleware().middleware);
  app.use(helmet());
  app.use(helmet.noCache()); // disable browser caching
  app.use(
    helmet.hsts({
      includeSubDomains: true, // enforce https everywhere
      preload: true
    })
  );
  app.use("/emoji", new EmojiRouter().router);
  app.use("/graphql", new GraphQLRouter().router);
  return { app };
};
