import { mutationWithClientMutationId } from "graphql-relay"
import { Daemon, DaemonInput } from "../../types"

import * as uuid from "uuid"
import * as models from "../../../models"

export const createDaemonMutation = mutationWithClientMutationId({
  name: "CreateDaemonMutation",
  inputFields: {
    createDaemonInput: {
      type: DaemonInput
    }
  },
  outputFields: {
    daemon: { type: Daemon }
  },
  mutateAndGetPayload: async ({ createDaemonInput }, context, info) => {
    const { id, ...rest } = createDaemonInput

    return {
      daemon: await models.Daemon.create({
        id: id || uuid.v4(),
        ownerId: context.request.userId || process.env.DEV_USER_ID,
        ...rest
      })
    }
  }
})
