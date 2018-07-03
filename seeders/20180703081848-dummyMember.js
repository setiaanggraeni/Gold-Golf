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
  for(let i=0; i<10; i++){
    var user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      birthdate: faker.date.between(1978,2000),
      phone: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
      createdAt: new Date(),
      updatedAt: new Date()
      };
      array.push(user)
  } 
    
    return queryInterface.bulkInsert('Members', array)
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
