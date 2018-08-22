import dataloaderSequelize from "dataloader-sequelize"

import config from "config"
// import * as cls from "continuation-local-storage"
import Sequelize from "sequelize"

import { logger } from "./logger"

// const namespace = cls.createNamespace(`saas/${ Date.now() }`);
// (Sequelize as any).useCLS(namespace)

export const database = new Sequelize(
  config.database.dbname,
  config.database.auth.username,
  config.database.auth.password, {
    native: false,
    pool: { max: 10, min: 1, idle: 30 },
    host: config.database.host,
    port: config.database.port,
    dialect: "postgres",
    logging: logger.info
  }
)

dataloaderSequelize(database)

export default database
