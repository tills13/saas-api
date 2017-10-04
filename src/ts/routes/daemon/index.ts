import * as _ from "lodash";
import * as Sequelize from "sequelize";
import * as uuid from "uuid";

import { Router } from "express";
import { logger } from "../../logger";
import { Daemon } from "../../models";
import { authenticated } from "../session/middleware";

let daemonRouter: Router = Router();

daemonRouter.post("/new", [authenticated], (request, response) => {
    Daemon.create({
        ...request.body,
        id: uuid.v4(),
        ownerId: request.session["user"].id
    }).then((daemon) => {
        response.status(200).send(daemon);
    });
});

daemonRouter.get("/", (request, response) => {
    Daemon.findAll({
        include: [{ all: true }]
    }).then((daemons) => {
        response.status(200).send(daemons);
    });
});

daemonRouter.get("/:daemonId", (request, response) => {
    Daemon.findById(request.params.DaemonId, {
        include: [{ all: true }]
    }).then((daemon) => {
        response.status(200).send(daemon);
    });
});

daemonRouter.put("/:daemonId", [authenticated], (request, response) => {
    Daemon.findById(request.params.DaemonId).then((daemon) => {
        if (daemon.ownerId !== request.session["user"].id) {
            throw new Error("only the owner can update a daemon");
        }

        return daemon.update(request.body);
    }).then((daemon) => {
        response.status(200).send(daemon);
    }).catch((err) => {
        response.status(400).send(err);
    });
});

export default daemonRouter;
