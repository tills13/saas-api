import { GraphQLObjectType, GraphQLString, } from "graphql"
import { connectionDefinitions, globalIdField } from "graphql-relay"
import { User as UserType } from "../"
import { connectionFields, nodeInterface } from "../../../config"
import { VisibilityEnum } from "../../enums"

import * as GraphQLJSON from "graphql-type-json"

export const BoardConfiguration = new GraphQLObjectType({
  name: "BoardConfiguration",
  fields: () => ({
    id: globalIdField("BoardConfiguration"),
    name: {
      type: GraphQLString
    },
    configuration: {
      type: GraphQLJSON
    },
    visibility: {
      type: VisibilityEnum
    },
    creator: {
      type: UserType,
      resolve: (boardConfiguration) => {
        return boardConfiguration.getCreator()
      }
    }
  }),
  interfaces: () => [nodeInterface]
})

export const { connectionType: BoardConfigurationConnection, edgeType: BoardConfigurationConnectionEdge } = connectionDefinitions({
  nodeType: BoardConfiguration,
  connectionFields: () => connectionFields
})
