import { GraphQLObjectType, GraphQLString } from "graphql"
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  globalIdField
} from "graphql-relay"
import { GameConnection, MedalConnection, SnakeConnection } from "../"
import { Game, Medal, Snake, UserInterface } from "../../../../models"
import { connectionFields, nodeInterface } from "../../../config"
import { connection } from "../../../utils"

export const User = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: globalIdField("User"),
    username: {
      type: GraphQLString
    },
    snakes: {
      type: SnakeConnection,
      args: connectionArgs,
      resolve: (user: UserInterface, args) => {
        return connection(Snake, { ownerId: user.id }, [], [], args)
      }
    },
    games: {
      type: GameConnection,
      args: connectionArgs,
      resolve: (user: UserInterface, args) => {
        return connection(Game, { creatorId: user.id }, [], [], args)
      }
    },
    medals: {
      type: MedalConnection,
      args: connectionArgs,
      resolve: (user: UserInterface, args) => {
        return connectionFromPromisedArray(
          (user.getMedals() as any),
          args
        )
      }
    }
  }),
  interfaces: () => [nodeInterface]
})

export const { connectionType: UserConnection, edgeType: UserConnectionEdge } = connectionDefinitions({
  nodeType: User,
  connectionFields: () => connectionFields
})
