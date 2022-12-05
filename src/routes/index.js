import express from 'express'
const routes = express.Router()

// Aplication Routes
const usersRouter = require('./users')

routes.use('/users', usersRouter)

routes.get('/', function (_req, res) {
  res.status(200).send({
    message: 'Hello world!',
    endpoint: '/',
  })
})

export default routes
