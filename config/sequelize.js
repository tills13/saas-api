var dotenv = require('dotenv')
dotenv.config({ path: __dirname + "/../.env" })

const { DB_USERNAME, DB_PASSWORD } = process.env
const { DB_HOST, DB_PORT, DB_NAME } = process.env

module.exports = {
  development: {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "postgres"
  }
}