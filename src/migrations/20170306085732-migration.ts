import Bluebird from "bluebird"
import Sequelize from "sequelize"

export const up = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return Promise.all([
    queryInterface.addColumn("Games", "boardFoodCount", {
      type: datatypes.INTEGER,
      defaultValue: 4
    }),
    queryInterface.addColumn("Games", "boardFoodStrategy", {
      type: Sequelize.ENUM,
      values: [ "RANDOM", "STATIC", "DONT_RESPAWN" ],
      defaultValue: "RANDOM"
    }),
    queryInterface.addColumn("Snakes", "isBountySnake", {
      type: datatypes.BOOLEAN,
      defaultValue: false
    }),
    queryInterface.addColumn("Snakes", "visibility", {
      type: datatypes.ENUM,
      values: [ "PUBLIC", "PRIVATE" ],
      defaultValue: "PRIVATE"
    })
  ])
}

export const down = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return Promise.all([
    queryInterface.removeColumn("Games", "boardFoodCount"),
    queryInterface.removeColumn("Games", "boardFoodStrategy"),
    queryInterface.removeColumn("Snakes", "isBountySnake"),
    queryInterface.removeColumn("Snakes", "visibility")
  ])
}
