'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Users',
            'kyc_applicant_id',
            {
                type: Sequelize.STRING,
                allowNull: true
            },
            'kyc_status',
            {
                type: Sequelize.INTEGER,
                allowNull: true
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return [
            queryInterface.removeColumn('Users', 'kyc_applicant_id'),
            queryInterface.removeColumn('Users', 'kyc_status')
        ];
    }
};
