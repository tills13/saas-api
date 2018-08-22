import Sequelize from "sequelize"
import database from "../database"

import { defaultTableConfiguration } from "../models"

export interface FileInterface extends Sequelize.Instance<{}> {
  id: string
  bucket: string
  key: string
  name: string
  url: string
  published: boolean

  createdAt: Date
  modifiedAt: Date
  deletedAt: Date
}

export const File = database.define<FileInterface, any>("File", {
  id: { type: Sequelize.UUID, primaryKey: true },
  bucket: { type: Sequelize.TEXT },
  name: { type: Sequelize.TEXT },
  key: { type: Sequelize.TEXT },
  url: { type: Sequelize.TEXT },
  published: { type: Sequelize.BOOLEAN, defaultValue: false }
}, defaultTableConfiguration)

