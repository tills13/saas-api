import { GraphQLEnumType } from "graphql"
import {
  VISIBILITY_PRIVATE,
  VISIBILITY_PUBLIC
} from "../../../constants"

export const VisibilityEnum = new GraphQLEnumType({
  name: "VisibilityEnum",
  values: {
    PUBLIC: { value: VISIBILITY_PUBLIC },
    PRIVATE: { value: VISIBILITY_PRIVATE }
  }
})

