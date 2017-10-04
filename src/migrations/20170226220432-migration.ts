import * as Bluebird from "bluebird"
import * as Sequelize from "sequelize"

import { logger } from "../ts/logger"

export const up = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return Promise.all([
    queryInterface.addColumn("Games", "boardColumns", {
      type: datatypes.INTEGER,
      defaultValue: 40
    }),
    queryInterface.addColumn("Games", "boardRows", {
      type: datatypes.INTEGER,
      defaultValue: 40
    }),
    queryInterface.addColumn("Games", "boardHasWalls", {
      type: datatypes.BOOLEAN,
      defaultValue: false
    })
  ])
}

export const down = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes) => {
  return Promise.all([
    queryInterface.removeColumn("Games", "boardColumns"),
    queryInterface.removeColumn("Games", "boardRows"),
    queryInterface.removeColumn("Games", "boardHasWalls")
  ])
}
