const express = require('express')
const UserController = require('#controllers/UserController')
const authMiddleware = require('#middlewares/auth')
const usersRouter = express.Router()

// Lista usuários
usersRouter.get('/index', authMiddleware, UserController.index)

// Cria usuário
usersRouter.post('/', UserController.store)

// Autentica usuário
usersRouter.post('/auth', UserController.authenticate)

// Rota padrão apenas para demonstração
usersRouter.get('/', (_req, res) => {
  res.status(200).send({
    message: 'Hello world!',
    endpoint: '/users',
  })
})

module.exports = usersRouter
