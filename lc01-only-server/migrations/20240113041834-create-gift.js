'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Gifts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.STRING
      },
      senderId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Users', key:'id'
        }, onUpdate:'cascade', onDelete:'cascade'
      },
      amount: {
        type: Sequelize.INTEGER
      },
      voucherId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Vouchers', key:'id'
        }, onUpdate:'cascade', onDelete:'cascade'
      },
      receiverId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Users', key:'id'
        }, onUpdate:'cascade', onDelete:'cascade'
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Gifts');
  }
};