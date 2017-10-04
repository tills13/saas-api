import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { connectionArgs, connectionFromPromisedArray, globalIdField } from "graphql-relay"

import {
  BoardConfiguration,
  Daemon,
  FileConnection,
  Game,
  MedalConnection,
  Snake,
  UserConnection,
  VisibilityEnum
} from "../../../types"

import PaginatedListType from "../../objects/paginated_list"

import { nodeInterface } from "../../../config"
import { connection } from "../../../utils"

import * as models from "../../../../models"

export const Application = new GraphQLObjectType({
  name: "Application",
  fields: () => ({
    id: globalIdField("Application", () => "Application"),
    debug: {
      type: GraphQLInt,
      args: { timeout: { type: GraphQLInt } },
      resolve: ({ timeout = 10 }) => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(1), timeout * 1000)
        })
      }
    },
    boards: {
      type: PaginatedListType(BoardConfiguration),
      args: {
        limit: { type: GraphQLInt },
        after: { type: GraphQLInt }
      },
      resolve: (context, args) => {
        return models.BoardConfiguration.findAndCountAll({
          offset: args.after,
          limit: args.limit
        }).then(({ rows, count }) => {
          return {
            items: rows,
            pageInfo: { count }
          }
        })
      }
    },
    daemons: {
      type: PaginatedListType(Daemon),
      args: {
        limit: { type: GraphQLInt },
        after: { type: GraphQLInt }
      },
      resolve: (context, args) => {
        return models.Daemon.findAndCountAll({
          offset: args.after,
          limit: args.limit
        }).then(({ rows, count }) => {
          return {
            items: rows,
            pageInfo: { count }
          }
        })
      }
    },
    files: {
      type: FileConnection,
      args: connectionArgs,
      resolve: (context, args) => {
        return connection(models.File, {}, [], null, args)
      }
    },
    games: {
      type: PaginatedListType(Game),
      args: {
        limit: { type: GraphQLInt },
        after: { type: GraphQLInt }
      },
      resolve: (context, args) => {
        return models.Game.findAndCountAll({
          offset: args.after,
          limit: args.limit
        }).then(({ rows, count }) => {
          return {
            items: rows,
            pageInfo: { count }
          }
        })
      }
    },
    medals: {
      type: MedalConnection,
      args: connectionArgs,
      resolve: (context, args) => {
        return connection(models.Medal, {}, [], null, args)
      }
    },
    snakes: {
      type: PaginatedListType(Snake),
      args: {
        limit: { type: GraphQLInt },
        after: { type: GraphQLInt }
      },
      resolve: (context, args) => {
        return models.Snake.findAndCountAll({
          offset: args.after,
          limit: args.limit
        }).then(({ rows, count }) => {
          return {
            items: rows,
            pageInfo: { count }
          }
        })
      }
    },
    users: {
      type: UserConnection,
      args: connectionArgs,
      resolve: (context, args) => {
        return connection(models.User, {}, [], null, args)
      }
    },
    visibilityOptions: {
      type: new GraphQLList(GraphQLString),
      resolve: () => {
        return VisibilityEnum.getValues()
        // return VisibilityEnum.getValues().map(({ value }) => value)
      }
    }
  }),
  interfaces: () => [nodeInterface]
})
