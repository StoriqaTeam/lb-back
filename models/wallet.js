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
        // lasttx: DataTypes.STRING,
        is_active: DataTypes.BOOLEAN,
        is_confirmed: DataTypes.BOOLEAN,
        balance: DataTypes.FLOAT
    }, {});
    Wallet.associate = function (models) {
        Wallet.belongsTo(models.User, {foreignKey: 'user_id'});
    };


    return Wallet;
};