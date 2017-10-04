import { GAME_STATUS_COMPLETED } from "../../../constants"
import { GraphQLNonNull } from "graphql"
import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay"
import { Game, GameUpdateInput } from "../../types"

import * as uuid from "uuid"
import * as models from "../../../models"

export const updateGameMutation = mutationWithClientMutationId({
  name: "UpdateGameMutation",
  description: "Updates a game",
  inputFields: {
    updateGameInput: {
      type: new GraphQLNonNull(GameUpdateInput)
    }
  },
  outputFields: {
    game: { type: Game }
  },
  mutateAndGetPayload: async ({ updateGameInput }, context, info) => {
    const { gameId, boardConfiguration: boardConfigurationId, daemon: daemonId, snakes, ...rest } = updateGameInput
    const mGameId = fromGlobalId(gameId).id
    const mBoardConfigurationId = boardConfigurationId ? fromGlobalId(boardConfigurationId).id : null
    const mDaemonId = daemonId ? fromGlobalId(daemonId).id : null

    const game = await models.Game.findById(mGameId)

    if (!game) throw new Error("Could not find game.")
    if (game.status === GAME_STATUS_COMPLETED) {
      throw new Error("Cannot update a completed game")
    }

    return Promise.all([
      game.update({ ...rest, boardConfigurationId: mBoardConfigurationId, daemonId: mDaemonId }),
      game.setSnakes(snakes.map((snake) => fromGlobalId(snake).id) || [])
    ]).then(() => {
      return { game }
    })
  }
})
