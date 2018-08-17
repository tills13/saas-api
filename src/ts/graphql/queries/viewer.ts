import { GraphQLFieldConfig } from "graphql"
import { QueryContext } from "."
import { User } from "../../models"
import { User as UserType } from "../types"

import * as Bluebird from "bluebird"


export const viewer: GraphQLFieldConfig<void, QueryContext> = {
  type: UserType,
  resolve: (source, args, { request }) => {
    const userId = request && request.userId
      ? request.userId
      : null

    return userId ? User.findById(userId) : null
  }
}
