import { S3 } from "aws-sdk"
import config from "config"

const { accessKeyId, endpoint, region, secretAccessKey, sslEnabled } = config.s3

export default new S3({
  accessKeyId,
  secretAccessKey,
  endpoint,
  region,
  s3ForcePathStyle: config.s3.forcePathStyle,
  signatureVersion: "v4",
  sslEnabled
})
