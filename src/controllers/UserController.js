require('dotenv/config')
const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const authConfig = require('#config/auth')
const User = require('#models/User')

function generateToken(params = {}) {
  const { secret, expiresIn } = authConfig.jwt
  return sign(params, secret, {
    expiresIn,
  })
}

module.exports = {
  async index(_req, res) {
    try {
      // Listagem de usuários e remove da response o campo password (mesmo criptografado)
      const users = await User.findAll({ attributes: { exclude: 'password' } })

      return res.status(200).send({ users })
    } catch (err) {
      return res.status(400).send({ error: 'erro ao carregar usuários' })
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

  async authenticate(req, res) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({
        where: { email },
      })

      if (!user) {
        return res.status(400).send({ error: 'usuário não encontrado' })
      }

      if (!(await compare(password, user.password))) {
        return res.status(400).send({ error: 'falha na autenticação' })
      }

      user.password = undefined

      res.status(200).send({ user, token: generateToken({ id: user.id }) })
    } catch (err) {
      res.status(400).send({ error: 'erro na autenticação' })
    }
  },
}
