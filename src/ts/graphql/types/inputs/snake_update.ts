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

export const UpdateSnakeInput = new GraphQLInputObjectType({
  name: "UpdateSnakeInput",
  fields: {
    snakeId: { type: new GraphQLNonNull(GraphQLID) },
    apiVersion: { type: new GraphQLNonNull(APIVersionEnum) },
    defaultColor: { type: new GraphQLNonNull(GraphQLString) },
    devUrl: { type: GraphQLString },
    headId: { type: new GraphQLNonNull(GraphQLID) },
    isBountySnake: { type: new GraphQLNonNull(GraphQLBoolean) },
    bountyDescription: { type: GraphQLString },
    name: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
    visibility: { type: new GraphQLNonNull(VisibilityEnum) }
  }
})
