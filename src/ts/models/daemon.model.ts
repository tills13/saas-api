import * as Sequelize from "sequelize"
import database from "../database"

import { defaultTableConfiguration, UserInterface } from "../models"

export interface DaemonInterface extends Sequelize.Instance<{}> {
  id: string
  averageResponseTime: number
  owner: UserInterface
  ownerId: string
  description: string
  name: string
  url: string
  visibility: SaaS.Visibility

  getOwner: Sequelize.BelongsToGetAssociationMixin<UserInterface>
  setOwner: Sequelize.BelongsToSetAssociationMixin<UserInterface, any>
}

export const Daemon = database.define<DaemonInterface, {}>(
  "Daemon",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    averageResponseTime: {
      type: Sequelize.VIRTUAL
    },
    description: {
      type: Sequelize.TEXT
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    url: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    visibility: {
      type: Sequelize.ENUM,
      values: ["PUBLIC", "PRIVATE"],
      defaultValue: "PRIVATE"
    }
  },
  defaultTableConfiguration
)

