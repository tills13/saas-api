import Sequelize from "sequelize"
import database from "../database"

import { defaultTableConfiguration, GameInterface, MedalInterface, SnakeInterface } from "../models"

export interface UserInterface extends Sequelize.Instance<{}> {
  id: string
  username: string
  password: string

  getSnakes: Sequelize.BelongsToManyGetAssociationsMixin<SnakeInterface>
  setSnakes: Sequelize.BelongsToManySetAssociationsMixin<SnakeInterface, any, any>
  addSnake: Sequelize.BelongsToManyAddAssociationMixin<SnakeInterface, any, any>
  addSnakes: Sequelize.BelongsToManyAddAssociationsMixin<SnakeInterface, any, any>

  getGames: Sequelize.BelongsToManyGetAssociationsMixin<GameInterface>
  setGames: Sequelize.BelongsToManySetAssociationsMixin<GameInterface, any, any>
  addGame: Sequelize.BelongsToManyAddAssociationMixin<GameInterface, any, any>
  addGames: Sequelize.BelongsToManyAddAssociationsMixin<GameInterface, any, any>

  getMedals: Sequelize.BelongsToManyGetAssociationsMixin<MedalInterface>
  setMedals: Sequelize.BelongsToManySetAssociationsMixin<MedalInterface, any, any>
  addMedal: Sequelize.BelongsToManyAddAssociationMixin<MedalInterface, any, any>
  addMedals: Sequelize.BelongsToManyAddAssociationsMixin<MedalInterface, any, any>
}

export const User = database.define<UserInterface, {}>(
  "User",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    }
  },
  defaultTableConfiguration
)
