import { GraphQLFieldConfig } from "graphql"
import { QueryContext } from "."
import { User } from "../../models"
import { User as UserType } from "../types"

import * as Bluebird from "bluebird"


export const viewer: GraphQLFieldConfig<void, QueryContext> = {
  type: UserType,
  resolve: (source, args, { request }) => {
    // const userId = request && request.userId
    //   ? request.userId
    //   : process.env.NODE_ENV === "development"
    //     ? process.env.DEV_USER_ID
    //     : null

    const userId = request && request.userId
      ? request.userId
      : null

    console.log(userId)

    return userId ? User.findById(userId) : null
  }
}
