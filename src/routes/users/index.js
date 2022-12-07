const express = require('express')
const UserController = require('#controllers/UserController')
const authMiddleware = require('#middlewares/auth')
const usersRouter = express.Router()

// Autentica usuário
usersRouter.post('/auth', UserController.authenticate)

// Cria usuário
usersRouter.post('/', UserController.store)

// Deleta usuário
usersRouter.delete('/:userId', authMiddleware, UserController.delete)

// Lista usuários
usersRouter.get('/index', authMiddleware, UserController.index)

// Lista usuário específico
usersRouter.get('/:userId', authMiddleware, UserController.show)

// Rota padrão apenas para demonstração
usersRouter.get('/', (_req, res) => {
  res.status(200).send({
    message: 'Hello world!',
    endpoint: '/users',
  })
})

module.exports = usersRouter
