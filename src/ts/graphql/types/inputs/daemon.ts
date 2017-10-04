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

export const DaemonInput = new GraphQLInputObjectType({
  name: "DaemonInput",
  fields: {
    description: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    url: {
      type: new GraphQLNonNull(GraphQLString)
    },
    visibility: {
      type: new GraphQLNonNull(VisibilityEnum)
    }
  }
})
