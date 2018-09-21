import config from "config"
import { GraphQLNonNull, GraphQLString } from "graphql"
import { mutationWithClientMutationId } from "graphql-relay"
import uuid from "uuid"

import { File as FileModel } from "../../../models"
import { getSignedUrl } from "../../../utils"
import { File } from "../../types"

export const initializeFileMutation = mutationWithClientMutationId({
  name: "InitializeFileMutation",
  description: "Initialize a file - returning a signed URL for uploading to",
  inputFields: {
    contentType: { type: new GraphQLNonNull(GraphQLString) },
    fileName: { type: new GraphQLNonNull(GraphQLString) },
    uploadType: { type: GraphQLString }
  },
  outputFields: {
    file: { type: File, resolve: ({ file }) => file },
    uploadUrl: { type: GraphQLString, resolve: ({ uploadUrl }) => uploadUrl }
  },
  async mutateAndGetPayload ({ contentType, fileName: name, uploadType }) {
    const id = uuid.v4()
    const key = `${ uploadType ? `${ uploadType }/` : "" }${ id }`
    const { bucket } = config.s3

    const file = await FileModel.create({ id, bucket, name, key })
    const uploadUrl = await getSignedUrl(key, contentType)

    return { file, uploadUrl }
  }
})
