import app from './src/app.js'


const APP_NAME = process.env.APP_NAME || 'BienesRaices'
const APP_PORT = process.env.APP_PORT || env.app.port

app.listen(APP_PORT, () => {
  console.log(`${APP_NAME} is running on port ${APP_PORT}`)
})