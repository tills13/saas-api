import * as Sequelize from "sequelize"
import database from "../database"

import { defaultTableConfiguration, UserInterface } from "../models"

export interface BoardConfigurationInterface extends Sequelize.Instance<{}> {
  id: string
  name: string
  configuration: string
  visibility?: SaaS.Visibility

  creator: UserInterface
  creatorId: string

  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date

  getCreator: Sequelize.BelongsToGetAssociationMixin<UserInterface>
  setCreator: Sequelize.BelongsToSetAssociationMixin<UserInterface, any>
}

export const BoardConfiguration = database.define<BoardConfigurationInterface, {}>(
  "BoardConfiguration",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    configuration: {
      type: Sequelize.JSON
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    visibility: {
      type: Sequelize.ENUM,
      values: ["PUBLIC", "PRIVATE"],
      defaultValue: "PUBLIC"
    }
  },
  defaultTableConfiguration
)
