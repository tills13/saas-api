import * as Bluebird from "bluebird"
import * as Sequelize from "sequelize"

import { logger } from "../ts/logger"

export const up = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return queryInterface.addColumn("Users", "email", {
    type: datatypes.STRING,
    unique: true
  })
}

export const down = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return queryInterface.removeColumn("Users", "email")
}
