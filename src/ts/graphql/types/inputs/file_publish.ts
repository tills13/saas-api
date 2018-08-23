import { GraphQLID, GraphQLInputObjectTypeConfig, GraphQLNonNull } from "graphql"

export const PublishFileInput: GraphQLInputObjectTypeConfig = {
  name: "PublishFileInput",
  fields: {
    fileId: { type: new GraphQLNonNull(GraphQLID) }
  }
}
