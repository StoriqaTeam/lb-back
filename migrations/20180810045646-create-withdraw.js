'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Withdraws', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      is_complete: {
        type: Sequelize.BOOLEAN
      },
      tx_hash: {
        type: Sequelize.STRING
      },
      to: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.FLOAT
      },
      price_usd: {
        type: Sequelize.FLOAT
      },
      confirmations: {
        type: Sequelize.INTEGER
      },
      raw_request: {
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Withdraws');
  }
};