import { Application } from "../types"

export const application = {
  type: Application,
  resolve: (context, args) => Promise.resolve({})
}
