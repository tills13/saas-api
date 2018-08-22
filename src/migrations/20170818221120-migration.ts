import Bluebird from "bluebird"
import Sequelize from "sequelize"

export const up = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return queryInterface.addColumn("Snakes", "devUrl", {
    type: datatypes.TEXT
  }).then(() => {
    return queryInterface.addColumn("Games", "devMode", {
      type: datatypes.BOOLEAN,
      defaultValue: false
    })
  })
}

export const down = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return Promise.all([
    queryInterface.removeColumn("Snakes", "devUrl"),
    queryInterface.removeColumn("Games", "devMode")
  ])
}
