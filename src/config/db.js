import Sequelize from "sequelize"
import env from "./env.js"

const DB_CONNECTION = env.db.connection
const DB_HOST = env.db.host
const DB_PORT = env.db.port
const DB_DATABASE = env.db.database
const DB_USERNAME = env.db.username
const DB_PASSWORD = env.db.password

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_CONNECTION,
})

export default sequelize