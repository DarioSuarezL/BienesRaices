import app from './src/app.js'
import { env } from './src/config/index.js'


const APP_NAME = env.app.name
const APP_PORT = env.app.port

app.listen(env.app.port, () => {
  console.log(`${APP_NAME} is running on port ${APP_PORT}`)
})