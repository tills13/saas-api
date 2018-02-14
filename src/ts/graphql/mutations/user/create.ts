import { GraphQLString } from "graphql"
import { mutationWithClientMutationId } from "graphql-relay"
import { User as UserType, UserInput } from "../../types"

import * as config from "config"
import { sign } from "jsonwebtoken"
import * as uuid from "uuid"
import * as models from "../../../models"
import { REGISTERED_MEDAL } from "../../../models"
import { hashPassword } from "../../../utils"

export const createUserMutation = mutationWithClientMutationId({
  name: "CreateUserMutation",
  inputFields: {
    createUserInput: {
      type: UserInput
    }
  },
  outputFields: {
    token: { type: GraphQLString },
    user: { type: UserType }
  },
  mutateAndGetPayload: async ({ createUserInput }, context, info) => {
    const { username, email, password: mPassword, confirmPassword } = createUserInput

    if (mPassword !== confirmPassword) throw new Error("Passwords do not match")

    const password = await hashPassword(mPassword)

    const exists = await models.User.findOne({ where: { $or: [{ email }, { username }] } }) !== null

    if (exists) throw new Error("User already exists...")

    const user = await models.User.create({ id: uuid.v4(), username, password, email }).then(async (user) => {
      const gettingStartedMedal = await models.Medal.findById(REGISTERED_MEDAL)

      await user.addMedal(gettingStartedMedal)
      return user
    })

    let token = sign({ userId: user.id }, config.server.secret)
    return { user, token }
  }
})
