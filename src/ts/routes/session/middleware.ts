import * as config from "config"

import { NextFunction, Request } from "express"
import { Response } from "express-serve-static-core"
import { verify } from "jsonwebtoken"
import { logger } from "../../logger"
import { User } from "../../models/user.model"

export const authenticated = (request: Request, response: Response, next: NextFunction) => {
  if (request.session["user"] !== undefined) {
    next()
  } else {
    let token =
      request.body.token ||
      request.query.token ||
      request.headers["x-access-token"] ||
      (request.cookies && request.cookies["token"])

    if (token) {
      verify(token, config.server.secret, (err, token) => {
        if (err) {
          logger.error(err)
          response.sendStatus(401)
        } else {
          logger.info(`${ token.id } authenticated by token`)
          User.findById(token.id).then((user) => {
            if (!user) throw new Error()

            request.session["user"] = user
            next()
          }).catch(() => {
            response.clearCookie("token").sendStatus(401)
          })
        }
      })
    } else {
      response.sendStatus(401)
    }
  }
}

export const anonymous = (request: Request, response: Response, next: NextFunction) => {
  next()
}
