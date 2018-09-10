'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Wallets',
            'wallet_type',
            {
                type: Sequelize.STRING,
                allowNull: true
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return [
            queryInterface.removeColumn('Wallets', 'wallet_type'),
        ];
    }
};
