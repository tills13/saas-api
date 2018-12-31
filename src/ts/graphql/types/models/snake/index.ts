import * as Types from "graphql"
import { connectionArgs, connectionDefinitions, globalIdField } from "graphql-relay"
import { WhereOptions } from "sequelize"

import { connectionFields, nodeInterface } from "../../../config"
import { APIVersionEnum, File as FileType, SnakeGameConnection, User } from "../../../types"
import { connection } from "../../../utils"
import { VisibilityEnum } from "../../enums"

import * as models from "../../../../models"

export const Snake = new Types.GraphQLObjectType({
  name: "Snake",
  fields: () => ({
    id: globalIdField("Snake"),
    bountyDescription: {
      type: Types.GraphQLString
    },
    defaultColor: {
      type: Types.GraphQLString
    },
    devUrl: {
      type: Types.GraphQLString
    },
    games: {
      type: SnakeGameConnection,
      args: {
        ...connectionArgs,
        placement: {
          defaultValue: undefined,
          type: Types.GraphQLInt
        }
      },
      resolve: (snake, args) => {
        let where: WhereOptions<any> = { SnakeId: snake.id }
        let include = []

        if (args.placement != undefined) {
          where.place = { $eq: args.placement }
        }

        return connection(
          models.SnakeGames, where,
          include, null, args
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
      type: Types.GraphQLBoolean
    },
    apiVersion: {
      type: APIVersionEnum
    },
    lastCheckedAt: {
      type: Types.GraphQLString
    },
    lastSuccessfullyCheckedAt: {
      type: Types.GraphQLString
    },
    name: {
      type: Types.GraphQLString
    },
    owner: {
      type: User,
      resolve: (snake, args) => snake.getOwner()
    },
    url: {
      type: Types.GraphQLString
    },
    visibility: {
      type: VisibilityEnum
    }
  }),
  interfaces: () => [ nodeInterface ]
})

export const { connectionType: SnakeConnection, edgeType: SnakeConnectionEdge } = connectionDefinitions({
  connectionFields: () => connectionFields,
  nodeType: Snake
})

export const { connectionType: GameSnakeConnection, edgeType: GameSnakeEdge } = connectionDefinitions({
  connectionFields: () => connectionFields,
  edgeFields: () => ({
    place: {
      type: Types.GraphQLInt,
      resolve: ({ node: snakeGame }) => snakeGame.place
    }
  }),
  name: "GameSnake",
  nodeType: Snake,
  resolveNode: ({ node: snakeGame }) => {
    return models.Snake.findById(snakeGame.SnakeId)
  }
})
