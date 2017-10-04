import { GraphQLID, GraphQLString } from "graphql"
import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay"

import * as models from "models"
import { File as FileType, FilePublishInput } from "../../types"

import * as config from "config"
import { getSignedUrl } from "utils"
import * as uuid from "uuid"
import s3 from "../../../s3"

export const publishFileMutation = mutationWithClientMutationId({
  name: "PublishFileMutation",
  description: "Publish a file",
  inputFields: {
    publishFileMutationInput: {
      type: FilePublishInput
    }
  },
  outputFields: {
    publishedFile: { type: FileType }
  },
  mutateAndGetPayload: async ({ publishFileMutationInput }, context, info) => {
    const { fileId } = publishFileMutationInput
    const mFileId = fromGlobalId(fileId).id

    const file = await models.File.findById(mFileId)

    if (!file) {
      throw new Error(`Cannot publish file ${ fileId } because it doesn't exist`)
    }

    return { publishedFile: await file.update({ published: true }) }
  }
})
