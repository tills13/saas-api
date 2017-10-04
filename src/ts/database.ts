import dataloaderSequelize from "dataloader-sequelize"

import * as config from "config"
import * as cls from "continuation-local-storage"
import * as Sequelize from "sequelize"

import { logger } from "./logger"

const namespace = cls.createNamespace(`saas/${ Date.now() }`)
Sequelize.useCLS(namespace)

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
