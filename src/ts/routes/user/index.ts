import { Router } from "express";
import { UserGames } from "../../models";
import { Game } from "../../models/game.model";
import { Snake } from "../../models/snake.model";
import { User } from "../../models/user.model";
import { authenticated } from "../session/middleware";

const userRouter: Router = Router();

userRouter.get("/", [authenticated], (request, response) => {
    response.status(200).send(request.session["user"]);
});

userRouter.get("/:userId/snakes", [authenticated], (request, response) => {
    const user = request.session["user"];
    const SnakeModel = user.id === request.params.userId ?
        Snake.unscoped() : Snake;

    SnakeModel.scope(user.id === request.params.userId ? null : "default").findAll({
        where: { ownerId: request.params.userId },
        // include: [{ model: Snake, as: "snakes" }]
    }).then((snakes) => {
        snakes.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
        response.status(200).send(snakes);
    });
});

userRouter.get("/:userId/games", [authenticated], (request, response) => {
    const user = request.session["user"];
    const GameModel = user.id === request.params.userId ?
        Game.unscoped() : Game;

    GameModel.findAll({
        where: { creatorId: request.session["user"].id },
        include: [{ model: Snake, as: "snakes" }]
    }).then((games) => {
        games.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        response.status(200).send(games);
    });
});

userRouter.get("/games", [authenticated], (request, response) => {
    Game.findAll({
        where: {
            creatorId: request.session["user"].id
        },
        include: [{ all: true }]
    }).then((games) => {
        games.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        response.status(200).send(games);
    });
});

userRouter.get("/snakes", [authenticated], (request, response) => {
    User.findById(request.session["user"].id).then((user) => {
        return user.getSnakes({ scope: null });
    }).then((snakes) => {
        snakes.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
        response.status(200).send(snakes);
    });
});

export default userRouter;
