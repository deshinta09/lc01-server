'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gift extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Gift.belongsTo(models.User,{foreignKey:'senderId'})
      Gift.belongsTo(models.User,{foreignKey:'receiverId'})
      Gift.belongsTo(models.Voucher,{foreignKey:'voucherId'})
    }
  }
  Gift.init({
    message: DataTypes.STRING,
    senderId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    voucherId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Gift',
  });
  return Gift;
};