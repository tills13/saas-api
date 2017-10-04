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

export const UpdateSnakeInput = new GraphQLInputObjectType({
  name: "UpdateSnakeInput",
  fields: {
    snakeId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    defaultColor: {
      type: new GraphQLNonNull(GraphQLString)
    },
    devUrl: {
      type: new GraphQLNonNull(GraphQLString)
    },
    headId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    isBountySnake: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    bountyDescription: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    url: {
      type: new GraphQLNonNull(GraphQLString)
    },
    isLegacy: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    visibility: {
      type: new GraphQLNonNull(VisibilityEnum)
    }
  }
})
