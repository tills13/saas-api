import { GraphQLObjectType, GraphQLString, } from "graphql"
import { connectionDefinitions, globalIdField } from "graphql-relay"
import GraphQLJSON from "graphql-type-json"

import { User as UserType } from "../"
import { connectionFields, nodeInterface } from "../../../config"
import { VisibilityEnum } from "../../enums"

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
  interfaces: () => [ nodeInterface ]
})

export const { connectionType: BoardConfigurationConnection, edgeType: BoardConfigurationConnectionEdge } = connectionDefinitions({
  nodeType: BoardConfiguration,
  connectionFields: () => connectionFields
})
