import express from 'express'
import mongoose from 'mongoose'
import http from 'http'
import { config } from './config/config'
import Logging from './library/Logging'
import customerRoutes from './routes/customer'
import cors from 'cors'

const app = express()

mongoose
  .connect(config.mongo.url)
  .then(() => {
    Logging.info('Connected to mongoDB')
    startServer()
  })
  .catch((error) => {
    Logging.error('Error connecting to mongoDB: ' + error.message)
  })

const startServer = () => {
  app.use((req, res, next) => {
    Logging.info(`method: ${req.method} - url: ${req.url} - IP: ${req.socket.remoteAddress}`)
    res.on('finish', () => {
      Logging.info(`status: ${res.statusCode} - method: ${req.method} url: ${req.url} IP: ${req.socket.remoteAddress}`)
    })
    next()
  })
  app.use(cors())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
      return res.status(200).json({})
    }
    next()
  })

  app.use('/customer', customerRoutes)
  app.use('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }))
  app.use((req, res, next) => {
    const error = new Error('404 Not found')
    Logging.error(error)
    res.status(404).json({
      message: error.message
    })
  })
  http.createServer(app).listen(config.port, () => {
    Logging.info(`Server running on port ${config.port}`)
  })
}
