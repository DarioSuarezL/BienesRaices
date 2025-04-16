import app from './src/app.js'


const APP_NAME = process.env.APP_NAME || 'BienesRaices'
const APP_PORT = process.env.APP_PORT || '3000'

app.listen(APP_PORT, () => {
  console.log(`${APP_NAME} is running on port ${APP_PORT}`)
})