'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {});
  Playlist.associate = function(models) {
    // associations can be defined here
    Playlist.belongsToMany(models.Song, {
      through: "PlaylistConnection",
      otherKey: "songId",
      foreignKey: "playlistId"
    })
  };
  return Playlist;
};
