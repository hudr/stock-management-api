const express = require('express')
const routes = express.Router()

// Aplication Routes
const usersRouter = require('./users')
const rolesRouter = require('./roles')

routes.use('/users', usersRouter)
routes.use('/roles', rolesRouter)

routes.get('/', function (_req, res) {
  res.status(200).send({
    message: 'Hello world!',
    endpoint: '/',
  })
})

module.exports = routes
