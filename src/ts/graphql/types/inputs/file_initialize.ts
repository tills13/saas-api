import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql"

export const InitializeFileInput = new GraphQLInputObjectType({
  name: "InitializeFileInput",
  fields: {
    contentType: { type: new GraphQLNonNull(GraphQLString) },
    fileName: { type: new GraphQLNonNull(GraphQLString) },
    uploadType: { type: GraphQLString }
  }
})
