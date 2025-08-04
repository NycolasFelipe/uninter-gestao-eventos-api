import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import models from '../models/index';

// Seeds
import seedPermissions from 'src/seeds/permissions';
import seedSchools from 'src/seeds/schools';
import seedVenues from 'src/seeds/venues';
import seedVenuePictures from 'src/seeds/venuesPictures';

dotenv.config({ path: process.env.NODE_ENV === 'test' ? ".env.test" : ".env" });

// Recuperar e validar variáveis de ambiente
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = Number(process.env.DB_PORT);

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT) {
  throw new Error("Variáveis de ambiente necessárias não configuradas");
}

// Função assíncrona para configuração do banco
async function setupDatabase() {
  // Criar banco se não existir
  const setupSequelize = new Sequelize({
    dialect: "mysql",
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    logging: false
  });

  try {
    await setupSequelize.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
    console.log(`Banco ${DB_NAME} verificado/criado com sucesso`);
  } finally {
    await setupSequelize.close();
  }

  // Criar instância principal conectada ao banco
  const mainSequelize = new Sequelize({
    dialect: "mysql",
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    logging: false,
    models
  });

  // Popula banco com dados iniciais
  await seedPermissions();
  await seedSchools();
  await seedVenues();
  await seedVenuePictures();

  return mainSequelize;
}

// Exportar instância configurada
const sequelize = (async () => await setupDatabase())();
export default sequelize;