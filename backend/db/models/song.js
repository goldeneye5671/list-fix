'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    songUrl: DataTypes.TEXT,
    title: DataTypes.STRING
  }, {});
  Song.associate = function(models) {
    Song.belongsTo(models.User, {foreignKey: 'userId'});
    Song.belongsTo(models.Album, {foreignKey: 'albumId'});
    Song.hasMany(models.Comment, {foreignKey: 'songId'});
    Song.hasMany(models.SongLike, {foreignKey: 'songId'});
    Song.belongsToMany(models.Playlist, {
      through: 'PlaylistConnection',
      //I go from my table to this joins table through this key
      otherKey: 'songId',
      //I go from the joins table to my destination table through this key
      //IN THE JOINS TABLE!!
      foreignKey: 'playlistId'
    })
    
    // associations can be defined here
  };
  return Song;
};
