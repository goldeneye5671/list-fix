'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Albums', [
     {
       userId: 1,
       title: "Google boi",
       imageUrl: null,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      userId: 1,
      title: "Abbey Road",
      imageUrl: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 1,
      title: "September in the rain",
      imageUrl: null,
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
   return queryInterface.bulkDelete('Albums', null, {});
  }
};
