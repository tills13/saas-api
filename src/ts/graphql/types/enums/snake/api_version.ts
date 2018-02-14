import { GraphQLEnumType } from "graphql"
import {
  API_VERSION_2017,
  API_VERSION_2018
} from "../../../../constants"

export const APIVersionEnum = new GraphQLEnumType({
  name: "APIVersionEnum",
  values: {
    NO_VERSION: { value: null },
    VERSION_2017: { value: API_VERSION_2017 },
    VERSION_2018: { value: API_VERSION_2018 }
  }
})

