'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    'Chat',
    {
      userId: DataTypes.UUID,
      text: DataTypes.STRING
    },
    {}
  );
  Chat.associate = function(models) {
    // associations can be defined here
  };
  return Chat;
};
