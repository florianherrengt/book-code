require("dotenv").config();

import { bootstrap, createApp } from "./app";
import { config } from "./config";

(async () => {
  await bootstrap();
  const { app } = createApp();
  app.listen(config.port, () => {
    console.info("Server listing on port " + config.port);
  });
})();
