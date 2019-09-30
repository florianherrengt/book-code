import { Sequelize } from "sequelize-typescript";
import { config } from "./config";
import * as models from "./entities";

export const sequelize = new Sequelize({
  ...config.database,
  logging: config.database.logging ? console.log : false
});

sequelize.addModels(Object.values(models));
