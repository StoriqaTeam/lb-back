'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      wallet_id: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      tx_hash: {
        type: Sequelize.STRING
      },
      sender: {
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
    return queryInterface.dropTable('Transactions');
  }
};