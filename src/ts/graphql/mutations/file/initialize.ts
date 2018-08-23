import config from "config"
import { GraphQLString } from "graphql"
import { mutationWithClientMutationId } from "graphql-relay"
import uuid from "uuid"

import { File as FileModel } from "../../../models"
import { getSignedUrl } from "../../../utils"
import { File, InitializeFileInput } from "../../types"

export const initializeFileMutation = mutationWithClientMutationId({
  name: "InitializeFileMutation",
  description: "Initialize a file - returning a signed URL for uploading to",
  inputFields: {
    initializeFileInput: {
      type: InitializeFileInput
    }
  },
  outputFields: {
    file: {
      type: File,
      resolve: ({ file }) => file
    },
    uploadUrl: {
      type: GraphQLString,
      resolve: ({ uploadUrl }) => uploadUrl
    }
  },
  mutateAndGetPayload: ({ initializeFileInput }) => {
    const { contentType, fileName, uploadType } = initializeFileInput
    const key = uuid.v4()

    return FileModel.create({
      id: key,
      bucket: config.s3.bucket,
      name: fileName,
      key: `${ uploadType ? `${ uploadType }/` : "" }${ key }`
    }).then(async (file) => {
      const uploadUrl = await getSignedUrl(`${ uploadType ? `${ uploadType }/` : "" }${ key }`, contentType)
      return { file, uploadUrl }
    })
  }
})
