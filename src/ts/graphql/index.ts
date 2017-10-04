import { GraphQLObjectType, GraphQLSchema } from "graphql"
import { nodeField } from "./config"

import * as mutations from "./mutations"
import * as queries from "./queries"

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "QueryRootType",
    fields: {
      node: nodeField,
      ...queries
    }
  }),
  mutation: new GraphQLObjectType({
    name: "MutationRootType",
    fields: {
      ...mutations
    }
  })
})
