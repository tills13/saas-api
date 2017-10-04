import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay"
import { Daemon, UpdateDaemonInput } from "../../types"

import * as uuid from "uuid"
import * as models from "../../../models"

export const updateDaemonMutation = mutationWithClientMutationId({
  name: "UpdateDaemonMutation",
  inputFields: {
    updateDaemonInput: {
      type: UpdateDaemonInput
    }
  },
  outputFields: {
    daemon: { type: Daemon }
  },
  mutateAndGetPayload: async ({ updateDaemonInput }, context, info) => {
    const { daemonId, ...rest } = updateDaemonInput
    const mDaemonId = fromGlobalId(daemonId).id

    const daemon = await models.Daemon.findById(mDaemonId)
    return { daemon: await daemon.update(rest) }
  }
})
