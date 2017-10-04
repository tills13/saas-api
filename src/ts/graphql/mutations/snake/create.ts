import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay"
import { Snake, SnakeInput } from "../../types"

import * as uuid from "uuid"
import * as models from "../../../models"

export const createSnakeMutation = mutationWithClientMutationId({
  name: "CreateSnakeMutation",
  inputFields: {
    createSnakeInput: {
      type: SnakeInput
    }
  },
  outputFields: {
    snake: { type: Snake }
  },
  mutateAndGetPayload: ({ createSnakeInput }, context, info) => {
    const { id, headId, ...rest } = createSnakeInput
    const mHeadId = fromGlobalId(headId).id

    return models.Snake.create({
      id: id || uuid.v4(),
      ownerId: context.request.userId || process.env.DEV_USER_ID,
      headId: mHeadId,
      ...rest
    }).then((snake) => {
      return { snake }
    })
  }
})
