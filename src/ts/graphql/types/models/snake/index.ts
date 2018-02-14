import {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString
} from "graphql"
import { connectionArgs, connectionDefinitions, globalIdField } from "graphql-relay"
import { connectionFields, nodeInterface } from "../../../config"
import { APIVersionEnum, File as FileType, GameConnection, User as UserType } from "../../../types"
import { connection } from "../../../utils"
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
      type: GameConnection,
      args: connectionArgs,
      resolve: (snake, args) => {
        const include = [
          {
            model: models.Snake,
            through: { where: { SnakeId: snake.id } },
            required: true,
            as: "snakes"
          }
        ]

        return connection(models.Game, {}, include, null, args)
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
      type: UserType,
      resolve: (snake, args) => {
        return snake.getOwner()
      }
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
  nodeType: Snake,
  connectionFields: () => connectionFields
})
