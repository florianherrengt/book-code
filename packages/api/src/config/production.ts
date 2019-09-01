import { sharedConfig } from "./shared";
import { Config } from "./index";

export const production: Config = {
  ...sharedConfig,
  env: "production"
};
