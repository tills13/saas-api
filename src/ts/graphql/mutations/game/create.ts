import { GraphQLNonNull } from "graphql"
import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay"
import { Application, Game, GameInput } from "../../types"

import uuid from "uuid"
import * as models from "../../../models"

export const createGameMutation = mutationWithClientMutationId({
  name: "CreateGameMutation",
  description: "Creates a game",
  inputFields: {
    createGameInput: {
      type: new GraphQLNonNull(GameInput)
    }
  },
  outputFields: {
    application: { type: Application, resolve () { return Application } },
    game: { type: Game }
  },
  mutateAndGetPayload: ({ createGameInput }, context, info) => {
    const { id, boardConfiguration, snakes, ...rest } = createGameInput
    const mSnakes = snakes.map((snakeId) => fromGlobalId(snakeId).id)

    return models.Game.create({
      id: id || uuid.v4(),
      creatorId: context.userId || process.env.DEV_USER_ID,
      boardConfigurationId: boardConfiguration,
      ...rest
    }).then(async (game) => {
      const snakes = await models.Snake.findAll({
        where: { id: { $in: mSnakes || [] } }
      })

      return game.addSnakes(snakes).then(async () => {
        return { game: await game.reload() }
      })
    })
  }
})
