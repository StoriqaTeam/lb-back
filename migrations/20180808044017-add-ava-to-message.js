'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Messages',
            'avatar',
            {
                type: Sequelize.STRING,
                allowNull: true
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Messages', 'avatar');
    }
};
