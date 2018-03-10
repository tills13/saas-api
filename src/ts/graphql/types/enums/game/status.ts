import { GraphQLEnumType } from "graphql"
import {
  GAME_STATUS_COMPLETED,
  GAME_STATUS_CREATED,
  GAME_STATUS_IN_PROGRESS,
  GAME_STATUS_RESTARTED,
  GAME_STATUS_STARTED,
  GAME_STATUS_STOPPED
} from "../../../../constants"

export const GameStatusEnum = new GraphQLEnumType({
  name: "GameStatusEnum",
  values: {
    COMPLETED: { value: GAME_STATUS_COMPLETED },
    CREATED: { value: GAME_STATUS_CREATED },
    IN_PROGRESS: { value: GAME_STATUS_IN_PROGRESS },
    RESTARTED: { value: GAME_STATUS_RESTARTED },
    STARTED: { value: GAME_STATUS_STARTED },
    STOPPED: { value: GAME_STATUS_STOPPED }
  }
})

