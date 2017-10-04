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

import * as GraphQLJSON from "graphql-type-json"

import { VisibilityEnum } from "../../types"

export const BoardConfigurationInput = new GraphQLInputObjectType({
  name: "BoardConfigurationInput",
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    configuration: {
      type: new GraphQLNonNull(GraphQLJSON)
    },
    visibility: {
      type: new GraphQLNonNull(VisibilityEnum)
    },
  }
})
