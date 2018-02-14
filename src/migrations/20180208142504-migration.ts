import * as Bluebird from "bluebird"
import * as Sequelize from "sequelize"

import { logger } from "../ts/logger"

export const up = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return queryInterface.addColumn("Snakes", "apiVersion", {
    type: datatypes.ENUM({ values: ["2017", "2018"] }),
    defaultValue: null
  }).then(() => {
    return queryInterface.sequelize.query(`
      UPDATE "Snakes" SET "apiVersion" = '2017'
      WHERE "isLegacy" = TRUE;
    `)
  }).then(() => {
    return queryInterface.removeColumn("Snakes", "isLegacy")
  })
}

export const down = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return queryInterface.addColumn("Snakes", "isLegacy", {
    type: datatypes.BOOLEAN
  }).then(() => {
    return queryInterface.sequelize.query(`
      UPDATE "Snakes" SET "isLegacy" = TRUE
      WHERE "apiVersion" = '2017';
    `)
  }).then(() => {
    return queryInterface.removeColumn("Snakes", "apiVersion")
  })
}
