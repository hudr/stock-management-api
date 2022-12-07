const Role = require('#models/Role')
const User = require('#models/User')

module.exports = {
  async index(req, res) {
    try {
      const roles = await Role.findAll()

      return res.status(200).send({ roles })
    } catch (err) {
      return res.status(400).send({ error: 'erro ao carregar cargos' })
    }
  },

  async show(req, res) {
    try {
      const { userId } = req.params

      const user = await User.findByPk(userId, {
        include: { association: 'roles', through: { attributes: [] } },
      })

      if (!user) {
        return res.status(400).send({ error: 'usuário não encontrado' })
      }

      return res.status(200).send(user.roles)
    } catch (err) {
      return res.status(400).send({ error: 'erro ao carregar cargos' })
    }
  },

  async store(req, res) {
    try {
      const { name } = req.body

      const [role] = await Role.findOrCreate({ where: { name } })

      return res.status(200).send(role)
    } catch (error) {
      return res.status(400).send(error)
    }
  },

  async delete(req, res) {
    try {
      const { roleId } = req.params

      const role = await Role.findByPk(roleId)

      if (!role) {
        return res.status(400).send({ error: 'cargo não encontrado' })
      }

      await role.destroy()

      return res.status(204).send(role)
    } catch (error) {
      return res.status(400).send(error)
    }
  },

  async storeToUser(req, res) {
    try {
      const { userId } = req.params
      const { name } = req.body

      const user = await User.findByPk(userId)

      if (!user) {
        return res.status(400).send({ error: 'usuário não encontrado' })
      }

      const role = await Role.findOne({ where: { name } })

      if (!role) {
        return res.status(400).send({ error: 'cargo não encontrado' })
      }

      await user.addRole(role)

      return res.status(200).send(role)
    } catch (error) {
      return res.status(400).send(error)
    }
  },

  async deleteToUser(req, res) {
    try {
      const { userId } = req.params
      const { name } = req.body

      const user = await User.findByPk(userId)

      if (!user) {
        return res.status(400).send({ error: 'usuário não encontrado' })
      }

      const role = await Role.findOne({ where: { name } })

      if (!role) {
        return res.status(400).send({ error: 'cargo não encontrado' })
      }

      await user.removeRole(role)

      return res.status(204).send()
    } catch (error) {
      return res.status(400).send(error)
    }
  },
}
