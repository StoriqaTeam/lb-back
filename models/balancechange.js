'use strict';
module.exports = (sequelize, DataTypes) => {
    const BalanceChange = sequelize.define('BalanceChange', {
        user_id: DataTypes.INTEGER,
        currency: DataTypes.STRING,
        change: DataTypes.FLOAT,
        total: DataTypes.FLOAT,
        operation: {
            type: DataTypes.ENUM,
            values: ['deposit', 'bonus', 'withdraw', 'win', 'cashback', 'refbonus']
        },
    }, {});
    BalanceChange.associate = function (models) {
        // associations can be defined here
    };
    return BalanceChange;
};