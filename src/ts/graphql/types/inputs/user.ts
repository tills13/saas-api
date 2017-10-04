import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from "graphql"

import { VisibilityEnum } from "../../types"

export const UserInput = new GraphQLInputObjectType({
  name: "UserInput",
  fields: {
    username: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
    confirmPassword: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    }
  }
})
