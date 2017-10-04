import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from "graphql"

import { VisibilityEnum } from "../../types"

export const SnakeInput = new GraphQLInputObjectType({
  name: "SnakeInput",
  fields: {
    bountyDescription: { type: GraphQLString },
    defaultColor: {
      type: new GraphQLNonNull(GraphQLString)
    },
    devUrl: { type: GraphQLString },
    headId: { type: GraphQLID },
    isBountySnake: { type: GraphQLBoolean },
    isLegacy: { type: GraphQLBoolean },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    url: {
      type: new GraphQLNonNull(GraphQLString)
    },
    visibility: {
      type: VisibilityEnum
    }
  }
})
