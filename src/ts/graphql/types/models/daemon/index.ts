import { GraphQLInt, GraphQLObjectType, GraphQLString, } from "graphql"
import { connectionDefinitions, globalIdField } from "graphql-relay"
import { User as UserType } from "../"
import { redisClient } from "../../../../redis"
import { connectionFields, nodeInterface } from "../../../config"
import { VisibilityEnum } from "../../enums"

export const Daemon = new GraphQLObjectType({
  name: "Daemon",
  fields: () => ({
    id: globalIdField("Daemon"),
    description: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
    visibility: {
      type: VisibilityEnum
    },
    owner: {
      type: UserType,
      resolve: (daemon, args) => {
        return daemon.getOwner()

      }
    },

    /* virtual fields */
    averageResponseTime: {
      type: GraphQLInt,
      resolve: (daemon, args) => {
        return redisClient.getAsync(`daemon:response_time:${ daemon.id }`).then((value) => {
          if (!value) return null
          let [x, sumSq, y, sum, z, count] = value

          if (sum != null && count != null) {
            return (parseFloat(sum) / parseInt(count)) * 1000
          }

          return null
        })
      }
    },
  }),
  interfaces: () => [nodeInterface]
})

export const { connectionType: DaemonConnection, edgeType: DaemonConnectionEdge } = connectionDefinitions({
  nodeType: Daemon,
  connectionFields: () => connectionFields
})
