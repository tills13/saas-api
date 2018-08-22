import bluebird from "bluebird"
import config from "config"
import redis from "redis"

const defaultConfig = {
  host: config.redis.host || "127.0.0.1",
  port: config.redis.port || 6379
}

if (config.redis.database) {
  defaultConfig[ "db" ] = config.redis.database
}

if (config.redis.auth && config.redis.auth.password) {
  defaultConfig[ "password" ] = config.redis.auth.password
}

export const redisClient = redis.createClient(defaultConfig)

export default bluebird.promisifyAll(redisClient) as redis.RedisClient
