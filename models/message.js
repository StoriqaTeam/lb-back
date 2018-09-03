'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    user_id: DataTypes.INTEGER,
    user_name: DataTypes.STRING,
    content: DataTypes.STRING,
    avatar: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};