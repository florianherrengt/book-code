import * as express from "express";
import fetch from "node-fetch";
import { setFetch } from "./containers";
import { EmojiRouter } from "./routers";

export const bootstrap = async () => {
  setFetch(fetch);
  // connect to db here later...
};

export const createApp = () => {
  const app = express();
  app.use("/emoji", new EmojiRouter().router);
  return { app };
};
