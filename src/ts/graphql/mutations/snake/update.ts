import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay"
import { Snake, UpdateSnakeInput } from "../../types"

import * as uuid from "uuid"
import * as models from "../../../models"

export const updateSnakeMutation = mutationWithClientMutationId({
  name: "UpdateSnakeMutation",
  inputFields: {
    updateSnakeInput: {
      type: UpdateSnakeInput
    }
  },
  outputFields: {
    snake: {
      type: Snake
    }
  },
  mutateAndGetPayload: async ({ updateSnakeInput }, context, info) => {
    const { snakeId, headId, ...rest } = updateSnakeInput
    const mSnakeId = fromGlobalId(snakeId).id
    const mHeadId = fromGlobalId(headId).id

    const snake = await models.Snake.findById(mSnakeId)
    return { snake: await snake.update({ ...rest, headId: mHeadId }) }
  }
})
