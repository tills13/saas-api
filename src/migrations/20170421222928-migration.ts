import * as Bluebird from "bluebird"
import * as Sequelize from "sequelize"

import { logger } from "../ts/logger"

export const up = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return queryInterface.createTable("BoardConfigurations", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    configuration: {
      type: Sequelize.JSON
    },
    visibility: {
      type: Sequelize.ENUM,
      values: ["PUBLIC", "PRIVATE"],
      defaultValue: "PUBLIC"
    },
    creatorId: {
      type: datatypes.UUID,
      references: {
        model: "Users",
        key: "id"
      },
      onDelete: "SET NULL"
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
  })
}

export const down = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return queryInterface.dropTable("BoardConfigurations")
}
