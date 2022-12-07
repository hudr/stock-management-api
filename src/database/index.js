const Sequelize = require('sequelize')
const dbConfig = require('#config/database')

const User = require('#models/User')
const Role = require('#models/Role')

const connection = new Sequelize(dbConfig)

User.init(connection)
Role.init(connection)

User.associate(connection.models)
Role.associate(connection.models)

module.exports = connection
