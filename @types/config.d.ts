declare interface Config {
  server?: ServerConfig
  database?: DatabaseConfig
  redis?: RedisConfig
  s3?: S3Config
}

declare interface ServerConfig {
  host?: string
  port: number
  secret: string
}

declare interface DatabaseConfig {
  host: string
  port: number
  dbname: string
  auth: {
    username: string
    password: string
  }
  options: {
    native: boolean
    pool: { maxConnections: number, maxIdleTime: number }
  }
}

declare interface RedisConfig {
  host: string
  port?: number
  database: string
  auth: {
    password: string
  }
}

declare interface S3Config {
  accessKeyId: string
  bucket?: string
  endpoint: string
  region: string
  secretAccessKey: string
  forcePathStyle: boolean
}

declare module "config" {
  export const database: DatabaseConfig
  export const redis: RedisConfig
  export const s3: S3Config
  export const server: ServerConfig
}