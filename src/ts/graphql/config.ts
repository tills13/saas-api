import { GraphQLFieldConfig, GraphQLInt } from "graphql"
import { fromGlobalId, nodeDefinitions } from "graphql-relay"
import { BoardConfiguration, Daemon, Game, GameInterface, Medal, Snake, User } from "../models"

import {
  Application,
  BoardConfiguration as BoardConfigurationType,
  Daemon as DaemonType,
  Game as GameType,
  Medal as MedalType,
  Snake as SnakeType,
  User as UserType
} from "./types"

export const { nodeField, nodeInterface } = nodeDefinitions(
  (id, context, info) => {
    const { id: mId, type } = fromGlobalId(id)

    if (type === "BoardConfiguration") {
      return BoardConfiguration.findById(mId)
    } else if (type === "Daemon") {
      return Daemon.findById(mId)
    } else if (type === "Game") {
      return Game.findById(mId)
    } else if (type === "Medal") {
      return Medal.findById(mId)
    } else if (type === "Snake") {
      return Snake.findById(mId)
    } else if (type === "User") {
      return User.findById(mId)
    } else if (type === "Application") {
      return Application
    }

    return null
  },
  (value, context, info) => {
    if (value instanceof (Game as any)) {
      return GameType
    } else if (value instanceof (Snake as any)) {
      return SnakeType
    } else if (value instanceof (Daemon as any)) {
      return DaemonType
    } else if (value.name === "Application") {
      return Application
    }

    return null
  }
)

export const connectionFields = {
  count: {
    type: GraphQLInt,
    resolve: (result) => result.count
  }
}
