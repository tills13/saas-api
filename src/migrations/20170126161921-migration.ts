import * as Bluebird from "bluebird"
import * as Sequelize from "sequelize"

import { logger } from "../ts/logger"

export const up = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes) => {
  return Promise.all([
    queryInterface.addColumn("Games", "status", {
      type: datatypes.ENUM,
      values: ["CREATED", "STARTED", "IN_PROGRESS", "RESTARTED", "STOPPED", "COMPLETED"],
      defaultValue: "CREATED"
    }),
    queryInterface.addColumn("Games", "startedAt", {
      type: datatypes.DATE
    }),
    queryInterface.addColumn("Games", "completedAt", {
      type: datatypes.DATE
    })
  ])
}

export const down = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes) => {
  return Promise.all([
    queryInterface.removeColumn("Games", "status"),
    queryInterface.removeColumn("Games", "startedAt"),
    queryInterface.removeColumn("Games", "completedAt")
  ])
}
