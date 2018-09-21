'use strict';
module.exports = (sequelize, DataTypes) => {
  const bets = sequelize.define('bets', {
    user_id: DataTypes.INTEGER,
    period: DataTypes.INTEGER,
    amount: DataTypes.DOUBLE,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {});
  bets.associate = function(models) {
    // associations can be defined here
  };
  return bets;
};