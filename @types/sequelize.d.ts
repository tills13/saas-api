import { SequelizeStatic } from "sequelize"
import { Namespace } from "continuation-local-storage"

declare module "sequelize" {
  interface SequelizeStatic {
    useCLS(cls: Namespace)
  }
}
