'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('PlaylistConnections', [
      {
        songId: 1,
        playlistId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        songId: 2,
        playlistId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        songId: 3,
        playlistId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        songId: 4,
        playlistId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        songId: 5 ,
        playlistId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('PlaylistConnections', null, {});
  }
};
