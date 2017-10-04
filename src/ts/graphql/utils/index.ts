import { Connection, ConnectionArguments } from "graphql-relay"
import * as hash from "object-hash"
import * as Sequelize from "sequelize"

export function toCursor (query, args, index) {
  const obj = {
    query,
    where: args.where,
    order: args.order
  }

  const h = hash(obj, { encoding: "base64" })
  const cursor = `${ h }:${ index }}`

  return Buffer.from(cursor, "ascii").toString("base64")
}

export function fromCursor (cursor, initial?: number) {
  if (!cursor) return initial
  return parseInt(Buffer.from(cursor, "base64").toString("ascii").split(":")[1], 10)
}

export function offsetFromArgs ({ after, before, first, last }: ConnectionArguments) {
  if (first && first >= 0) {
    return fromCursor(after, -1) + 1
  } else if (last && last >= 0) {
    return Math.max(fromCursor(before, -1) - last, 0)
  }

  return null
}

export function connection<T1 = any, T2 = any, T3 = any>(
  model: Sequelize.Model<T1, T2>,
  where: Sequelize.WhereOptions<any>,
  include: Array<Sequelize.Model<any, any> | Sequelize.IncludeOptions>,
  order: any,
  args: ConnectionArguments
) {
  return new Promise<Connection<T3>>((resolve, reject) => {
    const { after, before, first, last } = args

    const limit = first >= 0 ? first : last >= 0 ? last : null
    const offset = offsetFromArgs(args)

    const mWhere = {
      ...where
    }

    model.findAndCount({
      where: mWhere,
      include,
      limit,
      offset,
      order,
      subQuery: false
    }).then((result) => {
      const edges = result.rows.map((value, index) => ({
        cursor: toCursor({}, args, offset + index),
        node: value
      }))

      const firstEdge = edges[0]
      const lastEdge = edges[edges.length - 1]

      resolve(<Connection<any>>{
        edges,
        count: result.count,
        pageInfo: {
          startCursor: firstEdge ? firstEdge.cursor : null,
          endCursor: lastEdge ? lastEdge.cursor : null,
          hasPreviousPage: first > 0 ? offset + limit < result.count : false,
          hasNextPage: offset > 0
        }
      })
    })
  })
}
