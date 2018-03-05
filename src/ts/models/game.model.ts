import * as Sequelize from "sequelize"
import database from "../database"
import redisClient from "../redis"

import {
  BoardConfigurationInterface,
  defaultTableConfiguration,
  SnakeInterface,
  UserInterface
} from "../models"

export interface GameInterface extends Sequelize.Instance<{}> {
  id: string
  boardFoodCount: number
  boardFoodStrategy: number
  boardGoldCount: number
  boardGoldStrategy: number
  boardGoldRespawnTimeout: number
  boardGoldWinningThreshold: number
  boardHasWalls: boolean
  boardRows: number
  boardHasGold: boolean
  boardHasTeleporters: boolean
  boardTeleporterCount: number
  boardColumns: number
  createdAt: Date
  completedAt: Date
  devMode: boolean
  responseTime: number
  status: SaaS.GameState,
  startedAt: Date
  tickRate: number
  turnLimit: number

  boardConfiguration?: BoardConfigurationInterface
  creator: UserInterface
  winner: SnakeInterface
  parentGame: GameInterface
  snakes: SnakeInterface[]

  viewerCount: number

  getBoardConfiguration: Sequelize.BelongsToGetAssociationMixin<BoardConfigurationInterface>
  setBoardConfiguration: Sequelize.BelongsToSetAssociationMixin<BoardConfigurationInterface, any>

  getCreator: Sequelize.BelongsToGetAssociationMixin<UserInterface>
  setCreator: Sequelize.BelongsToSetAssociationMixin<UserInterface, any>

  getParentGame: Sequelize.BelongsToGetAssociationMixin<GameInterface>
  setParentGame: Sequelize.BelongsToSetAssociationMixin<GameInterface, any>

  getSnakes: Sequelize.BelongsToManyGetAssociationsMixin<SnakeInterface>
  setSnakes: Sequelize.BelongsToManySetAssociationsMixin<SnakeInterface, any, any>
  addSnake: Sequelize.BelongsToManyAddAssociationMixin<SnakeInterface, any, any>
  addSnakes: Sequelize.BelongsToManyAddAssociationsMixin<SnakeInterface, any, any>

  getWinner: Sequelize.HasOneGetAssociationMixin<SnakeInterface>
  setWinner: Sequelize.HasOneSetAssociationMixin<SnakeInterface, any>
}

export const Game = database.define<GameInterface, {}>(
  "Game",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    boardFoodCount: {
      type: Sequelize.INTEGER,
      defaultValue: 4
    },
    boardFoodStrategy: {
      type: Sequelize.ENUM,
      values: ["RANDOM", "STATIC", "DONT_RESPAWN"],
      defaultValue: "RANDOM"
    },
    boardGoldCount: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
    boardGoldStrategy: {
      type: Sequelize.ENUM,
      values: ["RANDOM", "STATIC", "DONT_RESPAWN"],
      defaultValue: "RANDOM"
    },
    boardGoldRespawnInterval: {
      type: Sequelize.INTEGER,
      defaultValue: 5000
    },
    boardGoldWinningThreshold: {
      type: Sequelize.INTEGER,
      defaultValue: 5
    },
    boardHasWalls: {
      type: Sequelize.BOOLEAN
    },
    boardRows: {
      type: Sequelize.INTEGER
    },
    boardColumns: {
      type: Sequelize.INTEGER
    },
    boardHasGold: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    boardHasTeleporters: {
      type: Sequelize.BOOLEAN
    },
    boardTeleporterCount: {
      type: Sequelize.INTEGER
    },
    completedAt: {
      type: Sequelize.DATE
    },
    devMode: {
      type: Sequelize.BOOLEAN
    },
    responseTime: {
      type: Sequelize.INTEGER,
      defaultValue: 1000
    },
    startedAt: {
      type: Sequelize.DATE
    },
    status: {
      type: Sequelize.ENUM,
      values: ["CREATED", "STARTED", "IN_PROGRESS", "RESTARTED", "STOPPED", "COMPLETED"],
      defaultValue: "CREATED"
    },
    tickRate: {
      type: Sequelize.INTEGER,
      defaultValue: 300
    },
    turnLimit: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    viewerCount: {
      type: new Sequelize.VIRTUAL(Sequelize.INTEGER)
    },
    visibility: {
      type: Sequelize.ENUM,
      values: ["PUBLIC", "PRIVATE"],
      defaultValue: "PRIVATE"
    }
  },
  {
    ...defaultTableConfiguration,
    scopes: {
      visibility (currentUserId) {
        return {
          where: {
            $or: [{ creatorId: currentUserId }, { visibility: "PUBLIC" }]
          }
        }
      }
    }
  }
)
