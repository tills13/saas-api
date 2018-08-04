import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString
} from "graphql"

import { connectionArgs, connectionDefinitions, fromGlobalId, globalIdField } from "graphql-relay"
import { connectionFields, nodeInterface } from "../../../config"
import {
  BoardConfiguration,
  Daemon,
  GameSnakeConnection,
  Snake,
  User
} from "../../../types"
import { connection } from "../../../utils"
import { GameStatusEnum, GameTypeEnum, SpawnStrategyEnum, VisibilityEnum } from "../../enums"

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
      type: BoardConfiguration
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
      type: User,
      resolve: (game, args) => {
        return game.getCreator()
      }
    },
    completedAt: {
      type: GraphQLInt
    },
    daemon: {
      type: Daemon,
      resolve: (game, args) => {
        return game.getDaemon()
      }
    },
    devMode: {
      type: GraphQLBoolean
    },
    gameType: { type: GameTypeEnum },
    parentGame: {
      type: Game,
      resolve: (game, args) => {
        return game.getParentGame()
      }
    },
    pinTail: { type: GraphQLBoolean },
    responseTime: {
      type: GraphQLInt
    },
    snakes: {
      type: GameSnakeConnection,
      args: connectionArgs,
      resolve: (game, args) => {
        return connection(
          models.SnakeGames,
          { GameId: game.id },
          [],
          null,
          args
        )
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
        return redisClient.getAsync(`game:viewer_count:${ game.id }`)
          .then((value) => parseInt(value, 10) || 0)
          .catch(() => 0)
      }
    },
    visibility: {
      type: VisibilityEnum
    },
    winner: {
      type: Snake,
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

export const { connectionType: SnakeGameConnection, edgeType: SnakeGameEdge } = connectionDefinitions({
  connectionFields: () => connectionFields,
  edgeFields: () => ({
    place: {
      type: GraphQLInt,
      resolve: ({ node: snakeGame }) => snakeGame.place
    }
  }),
  name: "SnakeGame",
  nodeType: Game,
  resolveNode: ({ node: snakeGame }) => {
    return models.Game.findById(snakeGame.GameId)
  }
})
