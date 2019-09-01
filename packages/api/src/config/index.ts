import { SharedConfig } from "./shared";
import { local } from "./local";
import { ci } from "./ci";
import { staging } from "./staging";
import { production } from "./production";

export interface Config extends SharedConfig {
  env: "local" | "ci" | "staging" | "production";
}

export const config = { local, ci, staging, production }[
  process.env.CONFIG_ENV || "local"
];
