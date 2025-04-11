import express from 'express'

import routes from './routes/index.js'
import { sequelize, env } from './config/index.js'

// Crea la app de express
const app = express()

// Conecta a la base de datos
try {
    await sequelize.authenticate()
    console.log('Database connected...')
    sequelize.sync()
    console.log('Database synced...')
} catch (error) {
    console.log('Error al conectar a la base de datos', error)
}

// Habilita el uso de formularios
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Configura el template engine pug
app.set('view engine', 'pug')
app.set('views', './src/views')

// Configurar carpeta de archivos estáticos
app.use(express.static('./src/public'))

// Configura las rutas
app.use('/', routes)

export default app