const { Model, DataTypes } = require('sequelize')

class Role extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'roles',
      }
    )
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      foreignKey: 'roleId',
      through: 'userRoles',
      as: 'users',
    })
  }
}

module.exports = Role
