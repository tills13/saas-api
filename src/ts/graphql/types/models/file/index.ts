import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql"
import { connectionDefinitions, globalIdField } from "graphql-relay"
import { GameConnection, SnakeConnection } from "../"
import { connectionFields, nodeInterface } from "../../../config"
import { MedalTierEnum } from "../../enums"

import * as config from "config"
import * as models from "models"
import { getS3Url } from "utils"
import s3 from "../../../../s3"

export const File = new GraphQLObjectType({
  name: "File",
  fields: () => ({
    id: globalIdField("File"),
    bucket: { type: GraphQLString },
    name: { type: GraphQLString },
    key: { type: GraphQLString },
    url: {
      type: GraphQLString,
      resolve: (file: models.FileInterface) => {
        return getS3Url(file)
      }
    },
    published: { type: GraphQLBoolean }
  }),
  interfaces: () => [nodeInterface]
})

export const { connectionType: FileConnection, edgeType: FileConnectionEdge } = connectionDefinitions({
  nodeType: File,
  connectionFields: () => connectionFields
})
