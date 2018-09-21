declare module "config" {
  interface Config {
    server?: ServerConfig
    database?: DatabaseConfig
    redis?: RedisConfig
    s3?: S3Config
  }

  interface ServerConfig {
    host?: string
    port: number
    secret: string
  }

  interface DatabaseConfig {
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

  interface RedisConfig {
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
    forcePathStyle: boolean
    region: string
    secretAccessKey: string
    sslEnabled: boolean
  }

  export const database: DatabaseConfig
  export const redis: RedisConfig
  export const s3: S3Config
  export const server: ServerConfig
}