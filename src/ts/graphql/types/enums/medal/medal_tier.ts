import { GraphQLEnumType } from "graphql"
import {
  MEDAL_TIER_BRONZE,
  MEDAL_TIER_GOLD,
  MEDAL_TIER_ONYX,
  MEDAL_TIER_PLATINUM,
  MEDAL_TIER_SILVER
} from "../../../../constants"

export const MedalTierEnum = new GraphQLEnumType({
  name: "MedalTierEnum",
  values: {
    MEDAL_TIER_BRONZE: { value: MEDAL_TIER_BRONZE },
    MEDAL_TIER_SILVER: { value: MEDAL_TIER_SILVER },
    MEDAL_TIER_GOLD: { value: MEDAL_TIER_GOLD },
    MEDAL_TIER_PLATINUM: { value: MEDAL_TIER_PLATINUM },
    MEDAL_TIER_ONYX: { value: MEDAL_TIER_ONYX }
  }
})

