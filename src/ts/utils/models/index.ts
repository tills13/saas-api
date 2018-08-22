import Sequelize from "sequelize"

export function applyVisibilityScope<T1 = any, T2 = any>(model: Sequelize.Model<T1, T2>, currentUserId) {
  return model.scope({ method: ["visibility", currentUserId] })
}
