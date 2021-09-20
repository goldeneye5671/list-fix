'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Comments', [
     {
       userId: 1,
       songId: 1,
       title: "Test1,",
       body: "Test comment 1",
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      userId: 1,
      songId: 1,
      title: "Test1,",
      body: "Test comment ",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 1,
      songId: 1,
      title: "Test1,",
      body: "Test comment 21",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 1,
      songId: 1,
      title: "Test1,",
      body: "Test comment 31",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 1,
      songId: 1,
      title: "Test1,",
      body: "Test comment 41",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 1,
      songId: 1,
      title: "Test1,",
      body: "Test comment 51",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 1,
      songId: 1,
      title: "Test1,",
      body: "Test comment 111",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 1,
      songId: 1,
      title: "Test1,",
      body: "Test comment 121",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 1,
      songId: 1,
      title: "Test1,",
      body: "Test comment 151",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 1,
      songId: 1,
      title: "Test1,",
      body: "Test comment 191",
      createdAt: new Date(),
      updatedAt: new Date()
    },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Comments', null, {});
  }
};
