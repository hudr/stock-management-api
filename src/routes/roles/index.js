const express = require('express')
const RoleController = require('#controllers/RoleController')
const authMiddleware = require('#middlewares/auth')
const rolesRouter = express.Router()

// Lista cargos
rolesRouter.get('/index', authMiddleware, RoleController.index)

// Lista cargos de um determinado usuário
rolesRouter.get('/:userId', authMiddleware, RoleController.show)

// Cria cargo
rolesRouter.post('/', authMiddleware, RoleController.store)

// Deleta um cargo
rolesRouter.delete('/:roleId', authMiddleware, RoleController.delete)

// Associa um usuário a determinado cargo caso exista
rolesRouter.post('/:userId/roles', authMiddleware, RoleController.storeToUser)

// Remove um usuário de determinado cargo caso exista
rolesRouter.delete(
  '/:userId/roles',
  authMiddleware,
  RoleController.deleteToUser
)

// Rota padrão apenas para demonstração
rolesRouter.get('/', (_req, res) => {
  res.status(200).send({
    message: 'Hello world!',
    endpoint: '/roles',
  })
})

module.exports = rolesRouter
