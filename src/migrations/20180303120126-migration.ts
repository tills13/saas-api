import Bluebird from "bluebird"
import Sequelize from "sequelize"

export const up = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return queryInterface.addColumn("Games", "pinTail", { type: datatypes.BOOLEAN, defaultValue: false })
}

export const down = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return queryInterface.removeColumn("Games", "pinTail")
}
