'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlaylistLike = sequelize.define('PlaylistLike', {
    playlistId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  PlaylistLike.associate = function(models) {
    PlaylistLike.belongsTo(models.Playlist, {foreignKey: 'playlistId'});
    PlaylistLike.belongsTo(models.User, {foreignKey: 'userId'});
    // associations can be defined here
  };
  return PlaylistLike;
};
