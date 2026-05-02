import dotenv from "dotenv";

const envFilePath = process.env.ENV_FILE ?? (process.env.NODE_ENV === "test" ? ".env.test" : ".env");
dotenv.config({ path: envFilePath });

const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT ?? 3000),
  SECRET: process.env.SECRET ?? "",
  ADMIN_FIXED_TOKEN: process.env.ADMIN_FIXED_TOKEN ?? "",
  DB_NAME: process.env.DB_NAME ?? "",
  DB_HOST: process.env.DB_HOST ?? "",
  DB_USER: process.env.DB_USER ?? "",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "",
  DB_PORT: Number(process.env.DB_PORT ?? 0),
};

export default env;
