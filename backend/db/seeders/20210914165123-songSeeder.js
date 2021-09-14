'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Songs',
    [
      {
        userId: 1,
        albumId: 5,
        songUrl: "https://www.google.com",
        title: "Google",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        albumId: 5,
        songUrl: "https://www.google.com",
        title: "Google2",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        albumId: 5,
        songUrl: "https://www.google.com",
        title: "Google3",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        albumId: 5,
        songUrl: "https://www.google.com",
        title: "Google4",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        albumId: 5,
        songUrl: "https://www.google.com",
        title: "Google Fanally",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Songs', null, {});
  }
};
