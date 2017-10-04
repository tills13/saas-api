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

import { GameStatusEnum, SpawnStrategyEnum, VisibilityEnum } from "../../types"

export const GameUpdateInput = new GraphQLInputObjectType({
  name: "GameUpdateInput",
  fields: {
    gameId: {
      type: new GraphQLNonNull(GraphQLID)
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
      type: GraphQLInt
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
      type: GraphQLInt
    },
    daemon: {
      type: GraphQLID
    },
    devMode: {
      type: GraphQLBoolean
    },
    responseTime: {
      type: GraphQLInt
    },
    tickRate: {
      type: GraphQLInt
    },
    turnLimit: {
      type: GraphQLInt
    },
    boardConfiguration: {
      type: GraphQLString
    },
    snakes: {
      type: new GraphQLList(GraphQLString)
    },
    visibility: {
      type: new GraphQLNonNull(VisibilityEnum)
    }
  }
})
