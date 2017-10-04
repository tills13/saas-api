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

export const UpdateBoardConfigurationInput = new GraphQLInputObjectType({
  name: "UpdateBoardConfigurationInput",
  fields: {
    boardConfigurationId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    configuration: {
      type: GraphQLString
    },
    visibility: {
      type: VisibilityEnum
    },
  }
})
