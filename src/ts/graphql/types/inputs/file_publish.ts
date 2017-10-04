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

export const FilePublishInput = new GraphQLInputObjectType({
  name: "FilePublishInput",
  fields: {
    fileId: {
      type: new GraphQLNonNull(GraphQLID)
    }
  }
})
