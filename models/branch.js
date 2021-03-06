'use strict';
module.exports = (sequelize, DataTypes) => {
  var Branch = sequelize.define('Branch', {
    branchName: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longtitude: DataTypes.STRING
  }, {});
  Branch.associate = function(models) {
    Branch.belongsToMany(models.User, {through: 'User_Branch'}),
    Branch.hasMany(models.User)
  };

  return Branch;
};