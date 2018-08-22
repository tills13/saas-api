import Bluebird from "bluebird"
import Sequelize from "sequelize"

export const up = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes) => {
  return Promise.all([
    queryInterface.addColumn("Snakes", "lastCheckedAt", {
      type: datatypes.DATE,
      defaultValue: datatypes.NOW
    }),
    queryInterface.addColumn("Snakes", "lastSuccessfullyCheckedAt", {
      type: datatypes.DATE,
      defaultValue: datatypes.NOW
    })
  ])
}

export const down = (queryInterface: Sequelize.QueryInterface, sequelize) => {
  return Promise.all([
    queryInterface.removeColumn("Snakes", "lastCheckedAt"),
    queryInterface.removeColumn("Snakes", "lastSuccessfullyCheckedAt")
  ])
}
