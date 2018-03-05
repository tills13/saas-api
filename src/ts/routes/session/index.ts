import * as bcrypt from "bcrypt"
import * as config from "config"
import * as express from "express"
import * as uuid from "uuid"

import { Promise } from "es6-promise"
import { Router } from "express"
import { sign } from "jsonwebtoken"
import { logger } from "../../logger"
import { Medal, PlayerMedals, User, UserInterface } from "../../models"
import { REGISTERED_MEDAL } from "../../models/medal.model"
import { anonymous, authenticated } from "./middleware"

const sessionHandler: Router = Router()

sessionHandler.get("/", authenticated, (request, response) => {
  User.findById(request.session["user"].id, {
    include: [{ all: true }]
  }).then((user) => {
    response.status(200).send(user)
  })
})

sessionHandler.post("/login", (request, response) => {
  const usernameOrEmail = request.body.username

  User.findOne({
    where: {
      $or: [
        { username: usernameOrEmail },
        { email: usernameOrEmail }
      ]
    }
  }).then((user) => {
    if (!user) return Promise.reject("Incorrect Username/Password")

    bcrypt.compare(request.body.password, user.password, (err, matches) => {
      if (matches) {
        let secret = config.server.secret
        let token = sign(<object> { userId: user.id }, secret)

        response.status(200).send({ token })
      } else {
        response.status(401).send(err)
      }
    })
  }).catch((err) => {
    logger.error(`${ err }`)
    response.status(400).send({ err })
  })
})

sessionHandler.post("/register", (request, response) => {
  // todo: user findOrCreate
  User.findOne({
    where: { username: request.body.username }
  }).then((user): Promise<UserInterface> => {
    if (!user) {
      let salt = bcrypt.genSaltSync(10)
      let hashedPassword = bcrypt.hashSync(request.body.password, salt)

      return User.create({
        id: uuid.v4(),
        username: request.body.username,
        email: request.body.email,
        password: hashedPassword
      })
    } else {
      return new Promise((resolve, reject) => {
        bcrypt.compare(request.body.password, user.password, (err, matches) => {
          if (matches) return resolve(user)
          else return reject("Incorrect Username/Password")
        })
      })
    }
  }).then((user) => {
    return Medal.findById(REGISTERED_MEDAL).then((medal) => {
      user.addMedal(medal)
      return user.save()
    })
  }).then((user) => {
    let token = sign(<object> { userId: user.id }, config.server.secret)
    response.status(200).send({ token })
  }).catch((err) => {
    logger.error(err)
    response.status(400).send({ err })
  })
})

sessionHandler.post("/logout", (request, response) => {
  request.session.destroy(() => {
    response.clearCookie("token")
    response.status(200).send()
  })
})

export default sessionHandler
