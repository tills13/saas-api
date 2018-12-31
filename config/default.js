var dotenv = require('dotenv')
dotenv.config({ path: __dirname + "/../.env" })

const {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  REDIS_DATABASE,
  REDIS_HOST,
  REDIS_PASS,
  S3_ACCESS_KEY,
  S3_BUCKET,
  S3_ENDPOINT,
  S3_PORT,
  S3_REGION,
  S3_SECRET_KEY,
  SERVER_PORT,
  SERVER_SECRET
} = process.env

const s3IsDev = S3_PORT != null || /(https?:\/\/127\.0\.0\.1(?::\d+)?|minio)$/.test(S3_ENDPOINT)
const s3Endpoint = s3IsDev
  ? `http://0.0.0.0:${S3_PORT}`
  : null

module.exports = {
  server: {
    port: SERVER_PORT || 3000,
    secret: SERVER_SECRET || "CHANGE ME"
  },
  database: {
    host: DB_HOST,
    port: DB_PORT || 5432,
    dbname: DB_NAME,
    auth: {
      username: DB_USER,
      password: DB_PASSWORD
    },
    options: {
      native: false,
      pool: { maxConnections: 20, maxIdleTime: 30 }
    }
  },
  redis: {
    host: REDIS_HOST,
    database: REDIS_DATABASE,
    auth: {
      password: REDIS_PASS
    }
  },
  s3: {
    accessKeyId: S3_ACCESS_KEY,
    bucket: S3_BUCKET,
    endpoint: s3Endpoint,
    region: S3_REGION,
    secretAccessKey: S3_SECRET_KEY,
    /* if we're using minio, use the "classic" S3 path style URLs */
    forcePathStyle: s3IsDev,
    sslEnabled: !s3IsDev
  }
}
