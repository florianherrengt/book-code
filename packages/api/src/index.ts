require("dotenv").config();
import * as awsServerlessExpress from "aws-serverless-express";

import { bootstrap, createApp } from "./app";

exports.handler = (event: any, context: any) => {
  bootstrap().then(() => {
    const { app } = createApp();
    const server = awsServerlessExpress.createServer(app);
    awsServerlessExpress.proxy(server, event, context);
  });
};
