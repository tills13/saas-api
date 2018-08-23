import { GraphQLID, GraphQLNonNull } from "graphql"
import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay"

import { File } from "../../../models"
import { File as FileType } from "../../types"

export const publishFileMutation = mutationWithClientMutationId({
  name: "PublishFileMutation",
  description: "Publish a file",
  inputFields: {
    fileId: { type: new GraphQLNonNull(GraphQLID) }
  },
  outputFields: {
    publishedFile: { type: FileType }
  },
  mutateAndGetPayload: async ({ publishFileInput }) => {
    const { fileId } = publishFileInput
    const mFileId = fromGlobalId(fileId).id

    const file = await File.findById(mFileId)

    if (!file) {
      throw new Error(`Cannot publish file ${ fileId } because it doesn't exist`)
    }

    return { publishedFile: await file.update({ published: true }) }
  }
})
