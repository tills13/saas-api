import * as _ from "lodash";
import * as Sequelize from "sequelize";
import * as uuid from "uuid";

import { Router } from "express";
import { logger } from "../../logger";
import { BoardConfiguration } from "../../models";
import { authenticated } from "../session/middleware";

let boardRouter: Router = Router();

boardRouter.post("/new", [authenticated], (request, response) => {
    BoardConfiguration.create({
        ...request.body,
        id: uuid.v4(),
        creatorId: request.session["user"].id
    }).then((configuration) => {
        response.status(200).send(configuration);
    });
});

boardRouter.get("/", (request, response) => {
    BoardConfiguration.findAll({
        include: [{ all: true }]
    }).then((configurations) => {
        response.status(200).send(configurations);
    });
});

boardRouter.get("/:boardConfigurationId", (request, response) => {
    BoardConfiguration.findById(request.params.boardConfigurationId, {
        include: [{ all: true }]
    }).then((configuration) => {
        response.status(200).send(configuration);
    });
});

boardRouter.put("/:boardConfigurationId", (request, response) => {
    BoardConfiguration.findById(request.params.boardConfigurationId).then((configuration) => {
        return configuration.update(request.body);
    }).then((configuration) => {
        response.status(200).send(configuration);
    });
});

export default boardRouter;
