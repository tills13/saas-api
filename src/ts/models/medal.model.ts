import Sequelize from "sequelize"
import database from "../database"

import { defaultTableConfiguration, GameInterface, UserInterface } from "../models"

export interface MedalInterface extends Sequelize.Instance<{}> {
  id: string
  name: string
  description: string
  tier: SaaS.MedalTier
  value: number

  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date

  getOwner: Sequelize.BelongsToGetAssociationMixin<UserInterface>
  setOwner: Sequelize.BelongsToSetAssociationMixin<UserInterface, any>

  getGames: Sequelize.BelongsToManyGetAssociationsMixin<GameInterface>
  setGames: Sequelize.BelongsToManySetAssociationsMixin<GameInterface, any, any>
  addGame: Sequelize.BelongsToManyAddAssociationMixin<GameInterface, any, any>
  addGames: Sequelize.BelongsToManyAddAssociationsMixin<GameInterface, any, any>
}

export const Medal = database.define<MedalInterface, {}>(
  "Medal",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name: {
      type: Sequelize.TEXT,
      unique: true
    },
    description: {
      type: Sequelize.TEXT("long")
    },
    tier: {
      type: Sequelize.ENUM,
      values: ["BRONZE", "SILVER", "GOLD", "PLATINUM", "ONYX"]
    },
    value: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  },
  {
    ...defaultTableConfiguration,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    paranoid: false,
    timestamps: false
  }
)

export const REGISTERED_MEDAL = "501c681b-4be8-4838-801c-b875450f4594"
