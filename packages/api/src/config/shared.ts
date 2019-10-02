export interface SharedConfig {
  logLevel: string;
  port: number;
  jwtSecret: string;
  database: {
    dialect: "postgres";
    host: string;
    username: string;
    password: string;
    database: string;
    port: number;
    logging: boolean;
  };
}

export const sharedConfig: SharedConfig = {
  logLevel: process.env.LOG_LEVEL || "info", // we will come back to logs later
  port: parseInt(process.env.PORT || "1234"),
  jwtSecret: process.env.JWT_SECRET || "",
  database: {
    dialect: "postgres",
    host: process.env.PG_HOST || "",
    username: process.env.PG_USERNAME || "",
    password: process.env.PG_PASSWORD || "",
    database: process.env.PG_DATABASE || "",
    port: parseInt(process.env.PG_PORT || ""),
    logging: Boolean(parseInt(process.env.DB_LOGS || "0"))
  }
};
