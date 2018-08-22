import Bluebird from "bluebird"
import Sequelize from "sequelize"

export const up = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return Promise.all([
    queryInterface.addColumn("Games", "boardHasTeleporters", {
      type: datatypes.BOOLEAN,
      defaultValue: false
    }),
    queryInterface.addColumn("Games", "boardTeleporterCount", {
      type: datatypes.INTEGER,
      defaultValue: 0
    })
  ])
}

export const down = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return Promise.all([
    queryInterface.removeColumn("Games", "boardHasTeleporters"),
    queryInterface.removeColumn("Games", "boardTeleporterCount")
  ])
}
