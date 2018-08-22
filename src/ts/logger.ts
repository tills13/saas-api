import colors from "colors/safe"
import { padStart } from "lodash"
import winston from "winston"

export const logger = new (winston.Logger)({
  transports: [
    new winston.transports.Console({
      timestamp: () => {
        const date = new Date()
        return `${ date.getHours() }:${ date.getMinutes() }:${ padStart(date.getSeconds().toString(), 2, "0") }`
      },
      formatter: (options) => {
        const colorMap = {
          info: colors.green,
          warn: colors.yellow,
          error: colors.red
        }

        const levelColor = colorMap[ options.level.toLowerCase() ] || colors.white
        const messageColor = options.level.toLowerCase() === "error" ? colors.bgRed : colors.white

        return `[${ colors.dim(options.timestamp()) }] ${ levelColor(options.level.toUpperCase()) } ${ messageColor(options.message) }`
      }
    })
  ]
})
