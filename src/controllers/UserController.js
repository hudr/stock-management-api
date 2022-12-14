require('dotenv/config')
const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { isUserAdmin } = require('#utils')
const authConfig = require('#config/auth')
const User = require('#models/User')

function generateToken(params = {}) {
  const { secret, expiresIn } = authConfig.jwt
  return sign(params, secret, {
    expiresIn,
  })
}

module.exports = {
  async index(req, res) {
    try {
      const user = await User.findByPk(req.id, {
        include: { association: 'roles', through: { attributes: [] } },
        attributes: { exclude: 'password' },
      })

      const userRoles = user.roles.map((role) => role.name)

      if (!isUserAdmin(userRoles)) {
        return res.status(403).send({ error: 'acesso não autorizado' })
      }

      const users = await User.findAll({ attributes: { exclude: 'password' } })

      return res.status(200).send({ users })
    } catch (err) {
      return res.status(400).send({ error: 'erro ao carregar usuários' })
    }
  },

  async show(req, res) {
    try {
      const user = await User.findByPk(req.id, {
        include: { association: 'roles', through: { attributes: [] } },
        attributes: { exclude: 'password' },
      })

      if (!user) {
        return res.status(400).send({ error: 'usuário não encontrado' })
      }

      return res.status(200).send({ user })
    } catch (err) {
      return res.status(400).send({ error: 'erro ao carregar usuário' })
    }
  },

  async showSpecificUser(req, res) {
    try {
      const { userId } = req.params

      const user = await User.findByPk(userId, {
        attributes: { exclude: 'password' },
      })

      if (!user) {
        return res.status(400).send({ error: 'usuário não encontrado' })
      }

      return res.status(200).send({ user })
    } catch (err) {
      return res.status(400).send({ error: 'erro ao carregar usuário' })
    }
  },

  async store(req, res) {
    try {
      const { name, email, password } = req.body

      if (await User.findOne({ where: { email } })) {
        return res.status(400).send({ error: 'e-mail já utilizado' })
      }

      const encryptedPassword = await hash(password, 10)

      const user = await User.create({
        name,
        email,
        password: encryptedPassword,
      })

      user.password = undefined

      return res
        .status(200)
        .send({ user, token: generateToken({ id: user.id }) })
    } catch (err) {
      res.status(400).send({ error: 'erro ao criar usuário' })
    }
  },

  async delete(req, res) {
    try {
      const { userId } = req.params

      const user = await User.findByPk(userId, {
        attributes: { exclude: 'password' },
      })

      if (!user) {
        return res.status(400).send({ error: 'usuário não encontrado' })
      }

      await user.destroy()

      return res.status(204).send()
    } catch (err) {
      return res.status(400).send({ error: 'erro ao carregar usuário' })
    }
  },

  async authenticate(req, res) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({
        where: { email },
        include: { association: 'roles', through: { attributes: [] } },
      })

      if (!user) {
        return res.status(400).send({ error: 'usuário não encontrado' })
      }

      const isCorrectPassword = await compare(password, user.password)

      if (!isCorrectPassword) {
        return res.status(400).send({ error: 'falha na autenticação' })
      }

      user.password = undefined

      res.status(200).send({ user, token: generateToken({ id: user.id }) })
    } catch (err) {
      res.status(400).send({ error: 'erro na autenticação' })
    }
  },
}
