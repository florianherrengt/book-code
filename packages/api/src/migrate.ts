import * as path from "path";
import { Sequelize } from "sequelize-typescript";
import * as Umzug from "umzug";

const createUmzug = (sequelize: Sequelize) => {
  const umzug = new Umzug({
    storage: "sequelize",
    storageOptions: {
      sequelize
    },

    migrations: {
      params: [sequelize.getQueryInterface()],
      path: path.join(__dirname, "./migrations"),
      pattern: /\.ts$/
    }
  });

  function logUmzugEvent(
    eventName: "migrating" | "migrated" | "reverting" | "reverted"
  ) {
    return (name: string) => {
      console.log(`${name} ${eventName}`);
    };
  }

  umzug.on("migrating", logUmzugEvent("migrating"));
  umzug.on("migrated", logUmzugEvent("migrated"));
  umzug.on("reverting", logUmzugEvent("reverting"));
  umzug.on("reverted", logUmzugEvent("reverted"));

  return umzug;
};

export { createUmzug };
