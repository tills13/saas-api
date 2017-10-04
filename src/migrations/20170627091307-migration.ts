import * as Bluebird from "bluebird"
import * as Sequelize from "sequelize"

import { logger } from "../ts/logger"

export const up = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return queryInterface.createTable("Files", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    bucket: { type: Sequelize.TEXT },
    name: { type: Sequelize.TEXT },
    key: { type: Sequelize.TEXT },
    url: { type: Sequelize.TEXT },
    published: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      type: datatypes.DATE,
      defaultValue: datatypes.NOW
    },
    updatedAt: {
      type: datatypes.DATE,
      defaultValue: datatypes.NOW
    },
    deletedAt: {
      type: datatypes.DATE
    }
  }).then(() => {
    return queryInterface.addColumn("Snakes", "headId", {
      type: datatypes.UUID,
      references: {
        model: "Files",
        key: "id"
      },
      onDelete: "SET NULL"
    })
  })
}

export const down = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return queryInterface.removeColumn("Snakes", "headId").then(() => {
    return queryInterface.dropTable("Files")
  })
}
