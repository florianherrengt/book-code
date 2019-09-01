import { sharedConfig } from "./shared";
import { Config } from "./index";

export const local: Config = {
  ...sharedConfig,
  env: "local"
};
