import { Sequelize } from 'sequelize-typescript';
import models from '../models/index';
import env from './env';

// Seeds
import seedPermissions from 'src/seeds/permissions';
import seedSchools from 'src/seeds/schools';
import seedVenues from 'src/seeds/venues';
import seedVenuePictures from 'src/seeds/venuesPictures';
import seedRoles from 'src/seeds/roles';
import seedUsers from 'src/seeds/user';
import seedRolesPermissions from 'src/seeds/rolesPermissions';
import seedEventTypes from 'src/seeds/eventType';
import seedEvents from 'src/seeds/events';
import seedSubscriptions from 'src/seeds/subscriptions';

// Função assíncrona para configuração do banco
async function setupDatabase() {
  // Criar banco se não existir
  const setupSequelize = new Sequelize({
    dialect: "mysql",
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    port: env.DB_PORT,
    logging: false
  });

  try {
    await setupSequelize.query(`CREATE DATABASE IF NOT EXISTS ${env.DB_NAME}`);
    console.log(`Banco ${env.DB_NAME} verificado/criado com sucesso`);
  } finally {
    await setupSequelize.close();
  }

  // Criar instância principal conectada ao banco
  const mainSequelize = new Sequelize({
    dialect: "mysql",
    database: env.DB_NAME,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    port: env.DB_PORT,
    logging: false,
    models
  });

  await mainSequelize.sync();

  await seedPermissions();
  await seedRoles();
  await seedRolesPermissions();
  await seedSchools();
  await seedVenues();
  await seedVenuePictures();
  await seedUsers();
  await seedEventTypes();
  await seedEvents();
  await seedSubscriptions();

  return mainSequelize;
}

// Exportar instância configurada
const sequelize = (async () => await setupDatabase())();
export default sequelize;
