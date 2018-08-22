import Bluebird from "bluebird"
import Sequelize from "sequelize"

export const up = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return queryInterface.createTable("Medals", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name: {
      type: Sequelize.TEXT,
      unique: true
    },
    description: {
      type: Sequelize.TEXT("long")
    },
    tier: {
      type: Sequelize.ENUM,
      values: [ "bronze", "silver", "gold", "platinum", "onyx" ]
    },
    value: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  }).then(() => {
    return queryInterface.createTable("PlayerMedals", {
      userId: {
        type: datatypes.UUID,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      medalId: {
        type: datatypes.UUID,
        references: {
          model: "Medals",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      gameId: {
        type: datatypes.UUID,
        references: {
          model: "Games",
          key: "id"
        },
        onDelete: "SET NULL"
      },
      awardedAt: {
        type: datatypes.DATE,
        defaultValue: datatypes.NOW
      }
    })
  }).then(() => {
    return queryInterface.bulkInsert("Medals", [ {
      id: "501c681b-4be8-4838-801c-b875450f4594",
      name: "Registered",
      description: "A medal just for showing up...",
      tier: "gold"
    } ])
  })
}

export const down = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return queryInterface.dropTable("PlayerMedals").then(() => {
    return queryInterface.dropTable("Medals")
  })
}
