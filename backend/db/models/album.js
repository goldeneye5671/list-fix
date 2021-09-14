'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    imageUrl: DataTypes.TEXT
  }, {});
  Album.associate = function(models) {
    Album.belongsTo(models.User, {foreignKey: 'userId'});
    Album.hasMany(models.Song, {foreignKey: 'albumId'});
    // associations can be defined here
  };
  return Album;
};
