const { Model, DataTypes } = require('sequelize')

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'users',
      }
    )
  }

  static associate(models) {
    this.belongsToMany(models.Role, {
      foreignKey: 'userId',
      through: 'userRoles',
      as: 'roles',
    })
  }
}

module.exports = User
