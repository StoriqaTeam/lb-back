'use strict';
module.exports = (sequelize, DataTypes) => {
  const payments = sequelize.define('payments', {
    user_id: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    price_usd: DataTypes.DECIMAL,
    price_eth: DataTypes.DECIMAL,
    tx_hash: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  payments.associate = function(models) {
    // associations can be defined here
  };
  return payments;
};