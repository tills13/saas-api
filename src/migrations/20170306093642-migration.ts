import * as Bluebird from "bluebird"
import * as Sequelize from "sequelize"

import { logger } from "../ts/logger"

export const up = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return Promise.all([
    queryInterface.addColumn("Games", "responseTime", {
      type: datatypes.INTEGER,
      defaultValue: 1000,
      comment: "move request timeout in ms"
    }),
    queryInterface.addColumn("Games", "tickRate", {
      type: datatypes.INTEGER,
      defaultValue: 300,
      comment: "tick rate in ms"
    })
  ])
}

export const down = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return Promise.all([
    queryInterface.removeColumn("Games", "responseTime"),
    queryInterface.removeColumn("Games", "tickRate")
  ])
}
