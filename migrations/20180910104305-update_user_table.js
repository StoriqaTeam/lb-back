'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Users',
            'provider_id',
            {
                type: Sequelize.STRING,
                allowNull: true
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return [
            queryInterface.removeColumn('Users', 'provider_id'),
        ];
    }
};
