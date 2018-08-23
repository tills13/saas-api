import { GraphQLFieldConfig } from "graphql"

import { User } from "../../models"
import { User as UserType } from "../types"

export const viewer: GraphQLFieldConfig<void, QueryContext> = {
  type: UserType,
  resolve: (source, args, { userId }) => {
    if (!userId) return null

    return User.findById(userId)
  }
}
