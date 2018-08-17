import { GraphQLID, GraphQLInputObjectType } from "graphql"
import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay"

import { Daemon } from "models"

export const deleteDaemonMutation = mutationWithClientMutationId({
  name: "DeleteDaemonMutation",
  inputFields: {
    deleteDaemonInput: {
      type: new GraphQLInputObjectType({
        name: "DeleteDaemonInput",
        fields: {
          daemonId: { type: GraphQLID }
        }
      })
    }
  },
  outputFields: {
    daemonId: { type: GraphQLID }
  },
  mutateAndGetPayload: async ({ deleteDaemonInput }, context, info) => {
    const { daemonId } = deleteDaemonInput
    const mDaemonId = fromGlobalId(daemonId).id

    const daemon = await Daemon.findById(mDaemonId)
    return daemon.destroy().then(_ => ({ daemonId }))
  }
})
