'use strict';

const fs = require('fs').promises

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let data = JSON.parse(await fs.readFile('./hacktiv_voucher.json', 'utf-8'))
   data = data.map(el=>{
    el.createdAt = el.updatedAt = new Date()
    return el
   })
    await queryInterface.bulkInsert('Vouchers', data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Vouchers', null, {})
  }
};
