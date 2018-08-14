'use strict';
module.exports = (sequelize, DataTypes) => {
  const Balance = sequelize.define('Balance', {
    user_id: DataTypes.INTEGER,
    wallet_id: DataTypes.INTEGER,
    wallet_address: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    operation: DataTypes.STRING,
    transaction_id: DataTypes.INTEGER
  }, {});
  Balance.associate = function(models) {
    // associations can be defined here
  };
  return Balance;
};