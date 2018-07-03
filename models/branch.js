'use strict';
module.exports = (sequelize, DataTypes) => {
  var Branch = sequelize.define('Branch', {
    area: DataTypes.STRING
  }, {});
  Branch.associate = function(models) {
    // associations can be defined here
  };
  return Branch;
};