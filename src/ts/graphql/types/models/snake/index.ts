import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString
} from "graphql"
import { connectionArgs, connectionDefinitions, connectionFromArray, globalIdField } from "graphql-relay"
import { connectionFields, nodeInterface } from "../../../config"
import { APIVersionEnum, File as FileType, SnakeGameConnection, User } from "../../../types"
import { connection, getOffsetFromArgs } from "../../../utils"
import { VisibilityEnum } from "../../enums"

import * as models from "../../../../models"

export const Snake = new GraphQLObjectType({
  name: "Snake",
  fields: () => ({
    id: globalIdField("Snake"),
    bountyDescription: {
      type: GraphQLString
    },
    defaultColor: {
      type: GraphQLString
    },
    devUrl: {
      type: GraphQLString
    },
    games: {
      type: SnakeGameConnection,
      args: connectionArgs,
      resolve: (snake, args) => {
        return connection(
          models.SnakeGames,
          { SnakeId: snake.id },
          [],
          null,
          args
        )
      }
    },
    head: {
      type: FileType,
      resolve: (snake, args) => {
        return snake.getHead()
      }
    },
    isBountySnake: {
      type: GraphQLBoolean
    },
    apiVersion: {
      type: APIVersionEnum
    },
    lastCheckedAt: {
      type: GraphQLString
    },
    lastSuccessfullyCheckedAt: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    owner: {
      type: User,
      resolve: (snake, args) => snake.getOwner()
    },
    url: {
      type: GraphQLString
    },
    visibility: {
      type: VisibilityEnum
    }
  }),
  interfaces: () => [nodeInterface]
})

export const { connectionType: SnakeConnection, edgeType: SnakeConnectionEdge } = connectionDefinitions({
  connectionFields: () => connectionFields,
  nodeType: Snake
})

export const { connectionType: GameSnakeConnection, edgeType: GameSnakeEdge } = connectionDefinitions({
  connectionFields: () => connectionFields,
  edgeFields: () => ({
    place: {
      type: GraphQLInt,
      resolve: ({ node: snakeGame }) => snakeGame.place
    }
  }),
  name: "GameSnake",
  nodeType: Snake,
  resolveNode: ({ node: snakeGame }) => {
    return models.Snake.findById(snakeGame.SnakeId)
  }
})
