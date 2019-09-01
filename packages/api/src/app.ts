import * as express from "express";
import fetch from "node-fetch";
import { setFetch } from "./containers";
import { EmojiRouter } from "./routers";
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
    console.error("Migration failed.");
    await umzug.down();
    process.exit(1);
  }
  await sequelize.sync();
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
  return { app };
};
