import { sharedConfig } from "./shared";
import { Config } from "./index";

export const ci: Config = {
  ...sharedConfig,
  env: "ci"
};
