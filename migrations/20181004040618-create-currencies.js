'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('currencies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      short: {
        type: Sequelize.STRING
      },
      hotAddress: {
        type: Sequelize.STRING
      },
      hotAddressApproxBalance: {
        type: Sequelize.DECIMAL,
          defaultValue: 0
      },
      height: {
        type: Sequelize.INTEGER
      },
      withdrawalFee: {
        type: Sequelize.DECIMAL,
        defaultValue: 0.001
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(function () {
        queryInterface.sequelize.query("insert into currencies (name, short, \"createdAt\", \"updatedAt\") " +
            "values ('Ethereum', 'ETH', NOW(), NOW())");
    });

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('currencies');
  }
};