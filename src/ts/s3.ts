import { S3 } from "aws-sdk"
import * as config from "config"

export const s3 = new S3({
  accessKeyId: config.s3.accessKeyId,
  secretAccessKey: config.s3.secretAccessKey,
  endpoint: config.s3.endpoint,
  // region: config.s3.region,
  s3ForcePathStyle: config.s3.forcePathStyle,
  signatureVersion: "v4",
  sslEnabled: false
})

export default s3
