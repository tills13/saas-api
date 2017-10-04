import * as Bluebird from "bluebird"
import * as Sequelize from "sequelize"

import { logger } from "../ts/logger"

function createGamesTable(queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes) {
  return queryInterface.createTable("Games", {
    id: {
      type: datatypes.UUID,
      primaryKey: true
    },
    creatorId: {
      type: datatypes.UUID,
      references: {
        model: "Users",
        key: "id"
      },
      onDelete: "SET NULL"
    },
    winnerId: {
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

function createSnakesTable(queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes) {
  return queryInterface.createTable("Snakes", {
    id: {
      type: datatypes.UUID,
      primaryKey: true
    },
    defaultColor: {
      type: datatypes.STRING,
      validate: { is: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i }
    },
    headImage: {
      type: datatypes.STRING,
    },
    name: {
      type: datatypes.STRING
    },
    ownerId: {
      type: datatypes.UUID,
      references: {
        model: "Users",
        key: "id"
      },
      onDelete: "SET NULL"
    },
    url: {
      type: datatypes.STRING
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

function createUsersTable(queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes) {
  return queryInterface.createTable("Users", {
    id: {
      type: datatypes.UUID,
      primaryKey: true
    },
    username: {
      type: datatypes.STRING,
      unique: true
    },
    password: {
      type: datatypes.STRING
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

function createJoinTables(queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes) {
  return Promise.all([
    queryInterface.createTable("SnakeGames", {
      GameId: {
        type: datatypes.UUID,
        references: {
          model: "Games",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      SnakeId: {
        type: datatypes.UUID,
        references: {
          model: "Snakes",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      createdAt: {
        type: datatypes.DATE,
        defaultValue: datatypes.NOW
      },
      updatedAt: {
        type: datatypes.DATE,
        defaultValue: datatypes.NOW
      }
    }),
    queryInterface.createTable("UserSnakes", {
      UserId: {
        type: datatypes.UUID,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      SnakeId: {
        type: datatypes.UUID,
        references: {
          model: "Snakes",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      createdAt: {
        type: datatypes.DATE,
        defaultValue: datatypes.NOW
      },
      updatedAt: {
        type: datatypes.DATE,
        defaultValue: datatypes.NOW
      }
    }),
    queryInterface.createTable("UserGames", {
      UserId: {
        type: datatypes.UUID,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      GameId: {
        type: datatypes.UUID,
        references: {
          model: "Games",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      createdAt: {
        type: datatypes.DATE,
        defaultValue: datatypes.NOW
      },
      updatedAt: {
        type: datatypes.DATE,
        defaultValue: datatypes.NOW
      }
    })
  ])
}

export const up = (queryInterface: Sequelize.QueryInterface, datatypes: Sequelize.DataTypes) => {
  return createUsersTable(queryInterface, datatypes)
    .then(() => createSnakesTable(queryInterface, datatypes))
    .then(() => createGamesTable(queryInterface, datatypes))
    .then(() => createJoinTables(queryInterface, datatypes))
}

export const down = (queryInterface: Sequelize.QueryInterface, sequelize) => {
  return Promise.all([
    queryInterface.dropTable("SnakeGames"),
    queryInterface.dropTable("UserGames"),
    queryInterface.dropTable("UserSnakes")
  ]).then(() => {
    return Promise.all([
      queryInterface.dropAllTables(),
      queryInterface.dropAllEnums()
    ])
  })
}
