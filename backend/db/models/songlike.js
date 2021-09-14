'use strict';
module.exports = (sequelize, DataTypes) => {
  const SongLike = sequelize.define('SongLike', {
    songId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  SongLike.associate = function(models) {
    // associations can be defined here
    SongLike.belongsTo(models.User, {foreignKey: 'userId'});
    SongLike.belongsTo(models.Song, {foreignKey: 'songId'});
  };
  return SongLike;
};
