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

export const FileInitializeInput = new GraphQLInputObjectType({
  name: "FileInitializeInput",
  fields: {
    contentType: {
      type: new GraphQLNonNull(GraphQLString)
    },
    fileName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    uploadType: {
      type: GraphQLString
    }
  }
})
