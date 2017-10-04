import * as Bluebird from "bluebird"
import * as Sequelize from "sequelize"

import { logger } from "../ts/logger"

export const up = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return queryInterface.createTable("Daemons", {
    id: {
      type: datatypes.UUID,
      primaryKey: true
    },
    ownerId: {
      type: datatypes.UUID,
      references: {
        model: "Users",
        key: "id"
      },
      onDelete: "CASCADE"
    },
    description: {
      type: datatypes.TEXT
    },
    name: {
      type: datatypes.TEXT,
      allowNull: true
    },
    url: {
      type: datatypes.TEXT,
      allowNull: true
    },
    visibility: {
      type: datatypes.ENUM,
      values: ["PUBLIC", "PRIVATE"],
      defaultValue: "PRIVATE"
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
    return queryInterface.addColumn("Games", "daemonId", {
      type: datatypes.UUID,
      references: {
        model: "Daemons",
        key: "id"
      },
      onDelete: "SET NULL"
    })
  })
}

export const down = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes): Bluebird<any> | Promise<any> => {
  return queryInterface.removeColumn("Games", "daemonId").then(() => {
    queryInterface.dropTable("Daemons")
  })
}
