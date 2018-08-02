'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Users',
            'verification_code',
            {
                type: Sequelize.STRING,
                allowNull: true
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Users', 'verification_code');
    }
};
