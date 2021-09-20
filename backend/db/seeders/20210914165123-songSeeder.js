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
        songUrl: "https://drive.google.com/uc?export=download&id=1jV2_o4Gt4qH8uJhH8fDxwrk66sQ-3g-3",
        title: "Journey (getting there...)",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        songUrl: "https://drive.google.com/uc?export=download&id=1jV2_o4Gt4qH8uJhH8fDxwrk66sQ-3g-3",
        title: "Last time",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        songUrl: "https://drive.google.com/uc?export=download&id=13nR02BE6rETWuN_mYJmTI8LUDIuT0oFQ",
        title: "Journey (Almost done...)",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        songUrl: "https://drive.google.com/uc?export=download&id=1ICyPK_kGtm9oDPxZBBUBWby5V3qavqZL",
        title: "The End (Finaly)",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        songUrl: "https://drive.google.com/uc?export=download&id=1nEXIX40RQ92c2wIqIga1LUAaOrPXIRU7",
        title: "Mind Reader",
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
