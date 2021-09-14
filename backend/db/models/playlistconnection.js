'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlaylistConnection = sequelize.define('PlaylistConnection', {
    playlistId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER
  }, {});
  PlaylistConnection.associate = function(models) {
    // associations can be defined here
    PlaylistConnection.belongsTo(models.Playlist, {foreignKey: 'playlistId'});
  };
  return PlaylistConnection;
};
