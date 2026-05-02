import app from "./app";
import env from "./config/env";
import warnMissingEnv from "./util/warnMissingEnv";

warnMissingEnv({
  PORT: env.PORT,
  SECRET: env.SECRET,
  ADMIN_FIXED_TOKEN: env.ADMIN_FIXED_TOKEN,
  DB_NAME: env.DB_NAME,
  DB_HOST: env.DB_HOST,
  DB_USER: env.DB_USER,
  DB_PASSWORD: env.DB_PASSWORD,
  DB_PORT: env.DB_PORT
});

async function bootstrap() {
  try {
    const { default: sequelize } = await import("./config/sequelize");
    await sequelize;
    app.listen(env.PORT, () => console.log(`Servidor rodando na porta ${env.PORT}`));
  } catch (error) {
    console.error("Falha na inicialização:", error);
    process.exit(1);
  }
}

bootstrap();
