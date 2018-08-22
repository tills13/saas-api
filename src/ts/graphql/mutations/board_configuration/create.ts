import { mutationWithClientMutationId } from "graphql-relay"
import { BoardConfiguration, BoardConfigurationInput } from "../../types"

import uuid from "uuid"
import * as models from "../../../models"

export const createBoardConfigurationMutation = mutationWithClientMutationId({
  name: "CreateBoardConfigurationMutation",
  inputFields: {
    createBoardConfigurationInput: {
      type: BoardConfigurationInput
    }
  },
  outputFields: {
    boardConfiguration: { type: BoardConfiguration }
  },
  mutateAndGetPayload: ({ createBoardConfigurationInput }, context, info) => {
    const { id, ...rest } = createBoardConfigurationInput

    return models.BoardConfiguration.create({
      id: id || uuid.v4(),
      creatorId: context.userId || process.env.DEV_USER_ID,
      ...rest
    }).then((boardConfiguration) => {
      return { boardConfiguration }
    })
  }
})
