'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    userId: DataTypes.INTEGER,
    songUrl: DataTypes.TEXT,
    title: DataTypes.STRING
  }, {});
  Song.associate = function(models) {
    Song.belongsTo(models.User, {foreignKey: 'userId'});
    Song.hasMany(models.Comment, {foreignKey: 'songId'});
    
    // associations can be defined here
  };
  return Song;
};
