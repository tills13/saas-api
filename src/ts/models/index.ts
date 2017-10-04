import * as Sequelize from "sequelize"
import database from "../database"

import { BoardConfiguration } from "./board_configuration.model"
import { Daemon } from "./daemon.model"
import { File } from "./file.model"
import { Game } from "./game.model"
import { Medal } from "./medal.model"
import { Snake } from "./snake.model"
import { User } from "./user.model"

export const defaultTableConfiguration = {
  paranoid: true,
  timestamps: true
}

export const SnakeGames = database.define("SnakeGames", {
  place: { type: Sequelize.INTEGER }
}, { timestamps: true, paranoid: false })

export const UserSnakes = database.define("UserSnakes", {}, { timestamps: true, paranoid: false })
export const UserGames = database.define("UserGames", {}, { timestamps: true, paranoid: false })
export const PlayerMedals = database.define("PlayerMedals", {}, {
  paranoid: false,
  deletedAt: false,
  createdAt: "awardedAt",
  updatedAt: false
})

/* define associations */
BoardConfiguration.belongsTo(User, { as: "creator" })

Snake.belongsTo(User, { as: "owner" })
Snake.belongsTo(File, { as: "head" })
Game.belongsTo(User, { as: "creator" })
Daemon.belongsTo(User, { as: "owner" })
Game.belongsTo(Snake, { as: "winner" })
Game.belongsTo(Game, { as: "parentGame" })
Game.belongsTo(BoardConfiguration, { as: "boardConfiguration" })
Game.belongsTo(Daemon, { as: "daemon" })

User.belongsToMany(Medal, { as: "medals", through: PlayerMedals, foreignKey: "userId", otherKey: "medalId" })
Snake.belongsToMany(Game, { as: "games", through: SnakeGames })
Game.belongsToMany(Snake, { as: "snakes", through: SnakeGames })
User.belongsToMany(Snake, { as: "snakes", through: UserSnakes, foreignKey: "userId", otherKey: "snakeId" })
User.belongsToMany(Game, { as: "games", through: UserGames, foreignKey: "userId", otherKey: "gameId" })

// database.sync({ force: false })

export * from "./board_configuration.model"
export * from "./daemon.model"
export * from "./file.model"
export * from "./game.model"
export * from "./medal.model"
export * from "./snake.model"
export * from "./user.model"

