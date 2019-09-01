import * as express from "express";
import fetch from "node-fetch";
import { setFetch } from "./containers";
import { EmojiRouter } from "./routers";
import * as helmet from "helmet";
import { RateLimiterMiddleware } from "./middlewares";

export const bootstrap = async () => {
  setFetch(fetch);
  // connect to db here later...
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
