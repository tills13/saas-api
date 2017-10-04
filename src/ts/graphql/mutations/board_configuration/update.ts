import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay"
import { BoardConfiguration, UpdateBoardConfigurationInput } from "../../types"

import * as models from "../../../models"

export const updateBoardConfigurationMutation = mutationWithClientMutationId({
  name: "UpdateBoardConfigurationMutation",
  inputFields: {
    updateBoardConfigurationInput: {
      type: UpdateBoardConfigurationInput
    }
  },
  outputFields: {
    boardConfiguration: { type: BoardConfiguration }
  },
  mutateAndGetPayload: async ({ updateBoardConfigurationInput }, context, info) => {
    const { boardConfigurationId, ...rest } = updateBoardConfigurationInput
    const mBoardConfigurationId = fromGlobalId(boardConfigurationId).id

    const boardConfiguration = await models.BoardConfiguration.findById(mBoardConfigurationId)
    return { boardConfiguration: await boardConfiguration.update(rest) }
  }
})
