import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from "graphql"

import { SpawnStrategyEnum, VisibilityEnum } from "../../types"

export const GameInput = new GraphQLInputObjectType({
  name: "GameInput",
  fields: {
    id: {
      type: GraphQLID
    },
    boardConfiguration: {
      type: GraphQLID
    },
    boardFoodCount: {
      type: GraphQLInt
    },
    boardFoodStrategy: {
      type: SpawnStrategyEnum
    },
    boardGoldCount: {
      type: GraphQLInt
    },
    boardGoldStrategy: {
      type: SpawnStrategyEnum
    },
    boardGoldRespawnTimeout: {
      type: GraphQLInt
    },
    boardGoldWinningThreshold: {
      type: GraphQLInt
    },
    boardHasWalls: {
      type: GraphQLBoolean
    },
    boardRows: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    boardHasGold: {
      type: GraphQLBoolean
    },
    boardHasTeleporters: {
      type: GraphQLBoolean
    },
    boardTeleporterCount: {
      type: GraphQLInt
    },
    boardColumns: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    daemon: {
      type: GraphQLID
    },
    devMode: {
      type: GraphQLBoolean
    },
    responseTime: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    tickRate: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    turnLimit: {
      type: GraphQLInt
    },
    snakes: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLID))
    },
    visibility: {
      type: new GraphQLNonNull(VisibilityEnum)
    }
  }
})
