import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay"

import * as models from "../../../models"
import { File as FileType, FilePublishInput } from "../../types"

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
  mutateAndGetPayload: async ({ publishFileMutationInput }) => {
    const { fileId } = publishFileMutationInput
    const mFileId = fromGlobalId(fileId).id

    const file = await models.File.findById(mFileId)

    if (!file) {
      throw new Error(`Cannot publish file ${ fileId } because it doesn't exist`)
    }

    return { publishedFile: await file.update({ published: true }) }
  }
})
