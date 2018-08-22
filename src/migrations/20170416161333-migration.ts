import Bluebird from "bluebird"
import Sequelize from "sequelize"

export const up = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return Promise.all([
    queryInterface.addColumn("Games", "parentGameId", {
      type: datatypes.UUID,
      references: {
        model: "Games",
        key: "id"
      },
      onDelete: "SET NULL"
    }),
    queryInterface.addColumn("SnakeGames", "place", {
      type: datatypes.INTEGER
    })
  ])
}

export const down = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return Promise.all([
    queryInterface.removeColumn("Games", "parentGameId"),
    queryInterface.removeColumn("SnakeGames", "place")
  ])
}
