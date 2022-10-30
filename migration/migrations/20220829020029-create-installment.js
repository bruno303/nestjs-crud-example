'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('installments', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      contractId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dueDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('installments');
  }
};