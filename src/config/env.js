import dotenv from 'dotenv'
dotenv.config()

const env = {
    app:{
        port: process.env.APP_PORT || 3000,
        name: process.env.APP_NAME || 'Bienes Raices',
        host: process.env.APP_HOST || 'localhost',
        env: process.env.APP_ENV || 'development',
    },
    db:{
        connection: process.env.DB_CONNECTION || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_DATABASE || 'bienesraices',
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || '',
    }
}

export default env