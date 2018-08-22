import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql"
import { connectionDefinitions, globalIdField } from "graphql-relay"

import { FileInterface } from "../../../../models"
import { getS3Url } from "../../../../utils"
import { connectionFields, nodeInterface } from "../../../config"

export const File = new GraphQLObjectType({
  name: "File",
  fields: () => ({
    id: globalIdField("File"),
    bucket: { type: GraphQLString },
    name: { type: GraphQLString },
    key: { type: GraphQLString },
    url: {
      type: GraphQLString,
      resolve: (file: FileInterface) => getS3Url(file)
    },
    published: { type: GraphQLBoolean }
  }),
  interfaces: () => [ nodeInterface ]
})

export const { connectionType: FileConnection, edgeType: FileConnectionEdge } = connectionDefinitions({
  nodeType: File,
  connectionFields: () => connectionFields
})
