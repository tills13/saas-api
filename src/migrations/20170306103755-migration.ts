import * as Bluebird from "bluebird"
import * as Sequelize from "sequelize"

import { logger } from "../ts/logger"

export const up = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return Promise.all([
    queryInterface.addColumn("Games", "boardGoldCount", {
      type: datatypes.INTEGER,
      defaultValue: 1
    }),
    queryInterface.addColumn("Games", "boardGoldStrategy", {
      type: Sequelize.ENUM,
      values: ["RANDOM", "STATIC", "DONT_RESPAWN"],
      defaultValue: "RANDOM"
    }),
    queryInterface.addColumn("Games", "boardGoldRespawnInterval", {
      type: datatypes.INTEGER,
      defaultValue: 5000
    }),
    queryInterface.addColumn("Games", "boardGoldWinningThreshold", {
      type: datatypes.INTEGER,
      defaultValue: 5
    })
  ])
}

export const down = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return Promise.all([
    queryInterface.removeColumn("Games", "boardGoldCount"),
    queryInterface.removeColumn("Games", "boardGoldStrategy"),
    queryInterface.removeColumn("Games", "boardGoldRespawnInterval"),
    queryInterface.removeColumn("Games", "boardGoldWinningThreshold")
  ])
}
