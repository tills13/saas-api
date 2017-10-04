import * as bluebird from "bluebird"
import * as config from "config"
import * as redis from "redis"

export const redisClient = redis.createClient({
  host: config.redis.host || "127.0.0.1",
  port: config.redis.port || 6379,
  db: config.redis.database,
  password: config.redis.auth.password
})

export default bluebird.promisifyAll(redisClient) as redis.RedisClient
