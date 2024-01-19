'use strict';
const {
  Model
} = require('sequelize');
const { createPassword } = require('../helpers/bcryp');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Gift,{foreignKey:'senderId',otherKey:'receiverId'})
    }
  }
  User.init({
    email: {type:DataTypes.STRING, unique:{msg:"Email must be unique"}, validate:{
      isEmail:{msg:"Invalid email format"}
    }},
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(user => {
    user.password = createPassword(user.password)
  });
  return User;
};