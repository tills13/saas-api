import { Request } from "express"
import { application } from "./application"
import { viewer } from "./viewer"

export { application, viewer }

export interface QueryContext {
  request: Request
}
