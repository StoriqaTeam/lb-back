'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    wallet_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    tx_hash: DataTypes.STRING,
    sender: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    price_usd: DataTypes.FLOAT,
    confirmations: DataTypes.INTEGER,
    raw_request: DataTypes.STRING
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};