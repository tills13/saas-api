# SAAS - Snake as a Service

![https://i.imgur.com/6EZQ2Qc.png](https://i.imgur.com/6EZQ2Qc.png)
![https://i.imgur.com/o3LQAN2.png](https://i.imgur.com/o3LQAN2.png)

Not sure how I feel about the name but that's what I landed on ... good enough for now.

- [Client](https://www.github.com/tills13/saas-web)
- [Server](https://www.github.com/tills13/saas-api)
- [Manager](https://www.github.com/tills13/saas-game-service)

## What is it?

If you know about BattleSnake, you're most of the way there. I've taken a lot of ideas and concepts
from there and applied them here. If you haven't, however, SaaS/BattleSnake is a coding competition
where teams or individuals build "AI controlled" snakes (classic Snake) which duke it out on a board.

## Server

A small GraphQL service from which the client gets its data. There are a lot of leftover routes from before I implemented GraphQL...

## How to Run

Before first run you'll need:
- a redis server
- a postgresql server (you can probably use something else like MySQL but your mileage may vary with Sequelize)
- a `.env` file (see `.env.example`)

Before first run:
`$ yarn build-migrations && yarn migrate`

To start
1. Install dependencies `$ yarn`
2. Run `$ yarn start`

#### Tech

- ExpressJS
- GraphQL
- Sequelize/PostgreSQL
- Redis
- Websockets (Socket.IO)

PRs welcome but ¯\\\_(ツ)\_/¯ it's just a hobby project.