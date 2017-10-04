import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql"
import { connectionDefinitions, globalIdField } from "graphql-relay"
import { GameConnection, SnakeConnection } from "../"
import { connectionFields, nodeInterface } from "../../../config"
import { MedalTierEnum } from "../../enums"

export const Medal = new GraphQLObjectType({
  name: "Medal",
  fields: () => ({
    id: globalIdField("Medal"),
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    tier: {
      type: MedalTierEnum
    },
    value: {
      type: GraphQLInt
    }
  }),
  interfaces: () => [nodeInterface]
})

export const { connectionType: MedalConnection, edgeType: MedalConnectionEdge } = connectionDefinitions({
  nodeType: Medal,
  connectionFields: () => connectionFields
})
