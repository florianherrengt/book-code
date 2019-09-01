export interface SharedConfig {
  logLevel: string;
}

export const sharedConfig = {
  logLevel: process.env.LOG_LEVEL || "info" // we will come back to logs later
};
