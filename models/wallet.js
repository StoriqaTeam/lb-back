'use strict';
const models = require('./index');

module.exports = (sequelize, DataTypes) => {
    const Wallet = sequelize.define('Wallet', {
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: models.User,
                key: 'id'
            }
        },
        currency: DataTypes.STRING,
        address: DataTypes.STRING,
        wallet_type: DataTypes.STRING,
        is_active: DataTypes.BOOLEAN,
        is_confirmed: DataTypes.BOOLEAN,
        balance: {
            type: DataTypes.DECIMAL,
            defaultValue: 0,
            validate: {min: 0}
        }
    }, {});
    Wallet.associate = function (models) {
        Wallet.belongsTo(models.User, {foreignKey: 'user_id'});
    };


    return Wallet;
};