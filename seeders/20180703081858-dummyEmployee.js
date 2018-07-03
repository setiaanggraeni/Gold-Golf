'use strict';
var faker = require('faker')
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    var array = []
    for(let i=0; i<5; i++){
      var user = {
        username: faker.name.firstName(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date()
        };
        array.push(user)
    } 
    return queryInterface.bulkInsert('Employees', array)
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
