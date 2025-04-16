import '../config/env.js'
import sequelize from "../config/db.js"
import { seedCategories, truncateCategories } from "./categories.seeder.js"

const seed = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.');
        await sequelize.sync({ force: true })
        console.log('Database synced successfully.');
        await Promise.all([
            seedCategories()
        ])
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close()
        console.log('Connection closed.');
    }
}

const truncate = async () => {
    try {
        await Promise.all([
            truncateCategories()
        ])
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close()
        console.log('Connection closed.');
    }
}

if (process.argv[2] === '--seed') seed()
if (process.argv[2] === '--truncate') truncate()