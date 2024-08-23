import { Sequelize } from "sequelize-typescript";
import type { Dialect } from "sequelize";
import config from "config";

const db = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect as Dialect,
    logging: console.log,
    models: [`${__dirname}/../models/**/*.ts`],
  }
);

export default db;
