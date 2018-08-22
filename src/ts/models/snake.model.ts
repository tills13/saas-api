import Sequelize from "sequelize"
import database from "../database"

import { Promise } from "es6-promise"
import { defaultTableConfiguration, FileInterface, GameInterface, UserInterface } from "../models"

export interface SnakeInterface extends Sequelize.Instance<{}> {
  id: string
  apiVersion: "2017" | "2018"
  defaultColor: string
  devUrl: string
  head: FileInterface
  headImageUrl: string
  isBountySnake?: boolean
  bountyDescription: string
  name: string
  url: string
  ownerId: string
  visibility?: SaaS.Visibility

  lastCheckedAt?: Date
  lastSuccessfullyCheckedAt?: Date

  /* virtual */
  body: (BoardPosition & { color?: string })[]
  score: number
  nextMove: "up" | "down" | "left" | "right"
  health: number
  health_points: number
  taunt: number

  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date

  getOwner: Sequelize.BelongsToGetAssociationMixin<UserInterface>
  setOwner: Sequelize.BelongsToSetAssociationMixin<UserInterface, any>

  getGames: Sequelize.BelongsToManyGetAssociationsMixin<GameInterface>
  setGames: Sequelize.BelongsToManySetAssociationsMixin<GameInterface, any, any>
  addGame: Sequelize.BelongsToManyAddAssociationMixin<GameInterface, any, any>
  addGames: Sequelize.BelongsToManyAddAssociationsMixin<GameInterface, any, any>
}

export const Snake = database.define<SnakeInterface, {}>(
  "Snake",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    apiVersion: {
      type: Sequelize.ENUM({ values: [ "2017", "2018" ] })
    },
    defaultColor: {
      type: Sequelize.STRING,
      validate: { is: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i }
    },
    devUrl: {
      type: Sequelize.TEXT
    },
    headImage: {
      type: Sequelize.STRING,
    },
    headImageUrl: {
      type: Sequelize.STRING,
    },
    isBountySnake: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    bountyDescription: {
      type: Sequelize.TEXT("long")
    },
    lastCheckedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    lastSuccessfullyCheckedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    name: {
      type: Sequelize.STRING
    },
    url: {
      type: Sequelize.STRING
    },
    visibility: {
      type: Sequelize.ENUM,
      values: [ "PUBLIC", "PRIVATE" ],
      defaultValue: "PRIVATE"
    },

    // virtuals
    points: Sequelize.VIRTUAL,
    health: Sequelize.VIRTUAL,
    health_points: Sequelize.VIRTUAL,
    body: Sequelize.VIRTUAL,
    nextMove: Sequelize.VIRTUAL,
    taunt: Sequelize.VIRTUAL
  },
  {
    ...defaultTableConfiguration,
    scopes: {
      visibility (currentUserId) {
        return {
          where: {
            $or: [ { ownerId: currentUserId }, { visibility: "PUBLIC" } ]
          }
        }
      }
    }
  }
)
