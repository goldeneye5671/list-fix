'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlaylistConnection = sequelize.define('PlaylistConnection', {
    songId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER
  }, {});
  PlaylistConnection.associate = function(models) {
    // associations can be defined here
  };
  return PlaylistConnection;
};