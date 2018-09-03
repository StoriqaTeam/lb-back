'use strict';
module.exports = (sequelize, DataTypes) => {
  const Withdraw = sequelize.define('Withdraw', {
    user_id: DataTypes.INTEGER,
    is_complete: DataTypes.BOOLEAN,
    tx_hash: DataTypes.STRING,
    to: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    price_usd: DataTypes.FLOAT,
    confirmations: DataTypes.INTEGER,
    raw_request: DataTypes.STRING
  }, {});
  Withdraw.associate = function(models) {
    // associations can be defined here
  };
  return Withdraw;
};