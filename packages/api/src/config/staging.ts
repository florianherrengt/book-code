import { sharedConfig } from "./shared";
import { Config } from "./index";

export const staging: Config = {
  ...sharedConfig,
  env: "staging"
};
