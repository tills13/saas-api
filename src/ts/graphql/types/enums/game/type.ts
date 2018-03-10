import { GraphQLEnumType } from "graphql"
import {
  GAME_TYPE_CUSTOM,
  GAME_TYPE_PLACEMENT,
  GAME_TYPE_SCORE
} from "../../../../constants"

export const GameTypeEnum = new GraphQLEnumType({
  name: "GameTypeEnum",
  values: {
    CUSTOM: { value: GAME_TYPE_CUSTOM },
    PLACEMENT: { value: GAME_TYPE_PLACEMENT },
    SCORE: { value: GAME_TYPE_SCORE }
  }
})
