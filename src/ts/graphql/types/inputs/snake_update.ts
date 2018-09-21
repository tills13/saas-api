import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString
} from "graphql"

import { APIVersionEnum, VisibilityEnum } from "../../types"

export const UpdateSnakeInput = new GraphQLInputObjectType({
  name: "UpdateSnakeInput",
  fields: {
    snakeId: { type: new GraphQLNonNull(GraphQLID) },
    apiVersion: { type: APIVersionEnum },
    defaultColor: { type: new GraphQLNonNull(GraphQLString) },
    devUrl: { type: GraphQLString },
    headId: { type: new GraphQLNonNull(GraphQLID) },
    isBountySnake: { type: GraphQLBoolean, defaultValue: false },
    bountyDescription: { type: GraphQLString },
    name: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
    visibility: { type: new GraphQLNonNull(VisibilityEnum) }
  }
})
