import Sequelize from "sequelize"

const DB_CONNECTION = process.env.DB_CONNECTION
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT 
const DB_DATABASE = process.env.DB_DATABASE
const DB_USERNAME = process.env.DB_USERNAME 
const DB_PASSWORD = process.env.DB_PASSWORD 

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_CONNECTION,
})

export default sequelize