import uuid from "uuid"

import database from "../../database"
import * as models from "../../models"

export function createFile () {
  return database.transaction(() => {
    return models.File.create({ id: uuid.v4() }).then((file) => {
      return Promise.all([
        models.File.create({ id: uuid.v4() }),
        models.File.create({ id: uuid.v4() }),
        models.File.create({ id: uuid.v4() })
      ]).then(() => file)
    })
  })
}
