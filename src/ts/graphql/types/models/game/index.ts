import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString
} from "graphql"

import { connectionArgs, connectionDefinitions, fromGlobalId, globalIdField } from "graphql-relay"
import { connectionFields, nodeInterface } from "../../../config"
import {
  BoardConfiguration as BoardConfigurationType,
  Daemon as DaemonType,
  Snake as SnakeType,
  SnakeConnection,
  User as UserType
} from "../../../types"
import { connection } from "../../../utils"
import { GameStatusEnum, SpawnStrategyEnum, VisibilityEnum } from "../../enums"

import * as moment from "moment"
import * as models from "../../../../models"
import redisClient from "../../../../redis"

export const Game = new GraphQLObjectType({
  name: "Game",
  fields: () => ({
    id: globalIdField("Game"),
    realId: {
      type: GraphQLString,
      resolve: (game) => game.id
    },
    boardConfiguration: {
      type: BoardConfigurationType
    },
    boardFoodCount: {
      type: GraphQLInt
    },
    boardFoodStrategy: {
      type: SpawnStrategyEnum
    },
    boardGoldCount: {
      type: GraphQLInt
    },
    boardGoldStrategy: {
      type: SpawnStrategyEnum
    },
    boardGoldRespawnTimeout: {
      type: GraphQLInt
    },
    boardGoldWinningThreshold: {
      type: GraphQLInt
    },
    boardHasWalls: {
      type: GraphQLBoolean
    },
    boardRows: {
      type: GraphQLInt
    },
    boardHasGold: {
      type: GraphQLBoolean
    },
    boardHasTeleporters: {
      type: GraphQLBoolean
    },
    boardTeleporterCount: {
      type: GraphQLInt
    },
    boardColumns: {
      type: GraphQLInt
    },
    createdAt: {
      type: GraphQLInt,
      resolve: (game) => moment(game.createdAt).unix()
    },
    creator: {
      type: UserType,
      resolve: (game, args) => {
        return game.getCreator()
      }
    },
    completedAt: {
      type: GraphQLInt
    },
    daemon: {
      type: DaemonType,
      resolve: (game, args) => {
        return game.getDaemon()
      }
    },
    devMode: {
      type: GraphQLBoolean
    },
    parentGame: {
      type: Game,
      resolve: (game, args) => {
        return game.getParentGame()
      }
    },
    responseTime: {
      type: GraphQLInt
    },
    snakes: {
      type: SnakeConnection,
      args: connectionArgs,
      resolve: (game, args) => {
        const include = [
          {
            model: models.Game,
            through: { where: { GameId: game.id } },
            required: true,
            as: "games"
          }
        ]

        return connection(models.Snake, {}, include, [], args)
      }
    },
    status: {
      type: GameStatusEnum
    },
    startedAt: {
      type: GraphQLInt
    },
    tickRate: {
      type: GraphQLInt
    },
    turnLimit: {
      type: GraphQLInt
    },
    viewerCount: {
      type: GraphQLInt,
      resolve: (game, args) => {
        console.log(game.id)
        return redisClient.getAsync(`game:viewer_count:${ game.id }`).then((value) => {
          console.log(value)
          return parseInt(value, 10) || 0
        }).catch(() => 0)
      }
    },
    visibility: {
      type: VisibilityEnum
    },
    winner: {
      type: SnakeType,
      resolve: (game, args) => {
        return game.getWinner()
      }
    },
  }),
  interfaces: () => [nodeInterface]
})

export const { connectionType: GameConnection, edgeType: GameConnectionEdge } = connectionDefinitions({
  nodeType: Game,
  connectionFields: () => connectionFields
})
