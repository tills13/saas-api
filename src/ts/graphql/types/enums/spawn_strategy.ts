import { GraphQLEnumType } from "graphql"
import {
  SPAWN_STRATEGY_DONT_RESPAWN,
  SPAWN_STRATEGY_RANDOM,
  SPAWN_STRATEGY_STATIC,
} from "../../../constants"

export const SpawnStrategyEnum = new GraphQLEnumType({
  name: "SpawnStrategyEnum",
  values: {
    DONT_RESPAWN: { value: SPAWN_STRATEGY_DONT_RESPAWN },
    RANDOM: { value: SPAWN_STRATEGY_RANDOM },
    STATIC: { value: SPAWN_STRATEGY_STATIC },
  }
})

