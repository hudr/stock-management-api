const express = require('express')

const usersRouter = express.Router()

usersRouter.get('/', (req, res) => {
  res.status(200).send({
    message: 'Hello world!',
    endpoint: '/users',
  })
})

module.exports = usersRouter
