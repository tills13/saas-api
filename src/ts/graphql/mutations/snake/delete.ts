import { GraphQLID, GraphQLInputObjectType } from "graphql"
import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay"
import { Application, Snake, UpdateSnakeInput } from "../../types"

import * as uuid from "uuid"
import * as models from "../../../models"

export const deleteSnakeMutation = mutationWithClientMutationId({
  name: "DeleteSnakeMutation",
  inputFields: {
    deleteSnakeInput: {
      type: new GraphQLInputObjectType({
        name: "DeleteSnakeInput",
        fields: {
          snakeId: { type: GraphQLID }
        }
      })
    }
  },
  outputFields: {
    application: {
      type: Application,
      resolve: () => {
        return Application
      }
    },
    snake: { type: Snake }
  },
  mutateAndGetPayload: async ({ deleteSnakeInput }, context, info) => {
    const { snakeId } = deleteSnakeInput
    const mSnakeId = fromGlobalId(snakeId).id

    const snake = await models.Snake.findById(mSnakeId)
    return snake.destroy()
  }
})
