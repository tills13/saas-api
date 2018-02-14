import "./models"

import * as bodyParser from "body-parser"
import * as config from "config"
import * as cookieParser from "cookie-parser"
import * as express from "express"
import * as graphql from "express-graphql"
import * as session from "express-session"
import { repeat, truncate } from "lodash"
import * as io from "socket.io"

import database from "./database"
import redisClient from "./redis"
import boardHandler from "./routes/board"
import daemonHandler from "./routes/daemon"
import sessionHandler from "./routes/session"
import userHandler from "./routes/user"

import { createServer, Server as HttpServer } from "http"
import { schema } from "./graphql"
import { logger } from "./logger"

import ExpressValidator = require("express-validator")

import { verify } from "jsonwebtoken"

export class Server {
  host: string
  instance: express.Express
  port: number
  server: HttpServer

  constructor (config: ServerConfig) {
    this.instance = express()
    this.host = config.host || "0.0.0.0"
    this.port = config.port || 3000

    this.setup()
  }

  start (): Promise<any> {
    return new Promise((resolve, reject) => {
      this.server = createServer(this.instance)
      this.server.listen(this.port, this.host, resolve)
    })
  }

  setup () {
    this.instance.use("/static", express.static("src/assets"))
    this.instance.use(bodyParser.json())
    this.instance.use(bodyParser.urlencoded({ extended: false }))
    this.instance.use(cookieParser())
    this.instance.use(ExpressValidator())

    this.instance.use((request, response, next) => {
      response.header("Access-Control-Allow-Origin", request.header("origin"))
      response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
      response.header("Access-Control-Allow-Headers", "Content-Type")
      response.header("Access-Control-Allow-Credentials", "true")

      next()
    })

    this.instance.use(session({
      resave: false,
      saveUninitialized: false,
      secret: "abcd1234"
    }))

    this.instance.use((request, response, next) => {
      const filter = (key, value) => {
        value = /password/.test(key) ? repeat("*", value.length) : value
        value = typeof value === "string" && value.length >= 30 ? truncate(value, { length: 30 }) : value

        return value
      }

      logger.info(`${ request.method }\t=> ${ request.url }`)

      if (["GET", "POST", "PUT", "DELETE", "OPTIONS"].indexOf(request.method.toUpperCase()) >= 0) {
        logger.info(`QUERY\t=> ${ JSON.stringify(request.query, filter, 4) }`)
        logger.info(`BODY\t=> ${ JSON.stringify(request.body, filter, 4) }`)
        logger.info(`\🍪 \t=> ${ JSON.stringify(request.cookies, filter, 4) }`)
      }

      if (request.method.toUpperCase() === "OPTIONS") {
        return response.sendStatus(200)
      }

      next()
    })

    this.setupRoutes()
  }

  setupRoutes () {
    const authMiddleware = (request: express.Request, response, next) => {
      if (request.get("authorization")) {
        try {
          const authorizationHeader: string = request.get("authorization")
          const token = authorizationHeader.split(" ")[1]
          const decoded: any = verify(token, config.server.secret)

          request.userId = decoded.userId
        } catch (err) {
          logger.info(`invalid token: ${ request.get("authorization") }`)
        }
      }

      next()
    }

    this.instance.use("/graphql", authMiddleware, graphql((request) => {
      return {
        context: { request },
        debug: process.env.NODE_ENV === "development",
        graphiql: process.env.NODE_ENV === "development",
        schema
      }
    }))

    this.instance.use("/api/boards", boardHandler)
    this.instance.use("/api/daemons", daemonHandler)
    this.instance.use("/api/session", sessionHandler)
    this.instance.use("/api/user", userHandler)

    this.instance.get("/api/status", (_, response) => response.status(200).send())
    this.instance.get("/status", (_, response) => response.status(200).send())
  }
}

export const server = new Server(config.server)

server.start().then(() => {
  logger.info(`started in ${ process.env.NODE_ENV || "prod" } environment`)
  database.authenticate().then(() => {
    logger.info("succesfully connected to database...")
  }).catch((err) => {
    logger.error(`could not connect to database: ${ err.message || "no error message supplied" }`)
  })
})
