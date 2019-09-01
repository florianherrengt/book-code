export interface SharedConfig {
  logLevel: string;
  port: number;
}

export const sharedConfig = {
  logLevel: process.env.LOG_LEVEL || "info", // we will come back to logs later
  port: parseInt(process.env.PORT || "1234")
};
