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

import { APIVersionEnum, VisibilityEnum } from "../../types"

export const SnakeInput = new GraphQLInputObjectType({
  name: "SnakeInput",
  fields: {
    apiVersion: { type: APIVersionEnum },
    bountyDescription: { type: GraphQLString },
    defaultColor: {
      type: new GraphQLNonNull(GraphQLString)
    },
    devUrl: { type: GraphQLString },
    headId: { type: GraphQLID },
    isBountySnake: { type: GraphQLBoolean },
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
