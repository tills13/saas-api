import { GraphQLString } from "graphql"
import { mutationWithClientMutationId } from "graphql-relay"

import * as uuid from "uuid"

import database from "../../database"
import * as models from "../../models"
import { createFile } from "./test_utils"

export const testMutation = mutationWithClientMutationId({
  name: "TestMutation",
  inputFields: {},
  outputFields: { id: { type: GraphQLString } },
  mutateAndGetPayload: ({ createUserInput }, context, info) => {
    // return database.transaction((t1) => {
    return database.transaction(() => {
      return createFile().then((file) => {
        return file.reload().then((mFile) => ({ id: mFile.id }))
      })
    })
  }
})
