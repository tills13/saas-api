import { GraphQLInt, GraphQLList, GraphQLObjectType } from "graphql"

export const PaginatedListType = (type: GraphQLObjectType) => {
  return new GraphQLObjectType({
    name: `PaginatedListType_${ type.name }`,
    description: "Paginated list",
    fields: {
      pageInfo: {
        type: new GraphQLObjectType({
          name: `PaginatedListPageInfo_${ type.name }`,
          fields: {
            count: { type: GraphQLInt }
          }
        })
      },
      items: {
        type: new GraphQLList(type)
      }
    }
  })
}

export default PaginatedListType
