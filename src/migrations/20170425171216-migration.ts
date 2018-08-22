import Bluebird from "bluebird"
import Sequelize from "sequelize"

export const up = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return queryInterface.addColumn("Games", "boardConfigurationId", {
    type: datatypes.UUID,
    references: {
      model: "BoardConfigurations",
      key: "id"
    },
    onDelete: "SET NULL"
  })
}

export const down = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return queryInterface.removeColumn("Games", "boardConfigurationId")
}
