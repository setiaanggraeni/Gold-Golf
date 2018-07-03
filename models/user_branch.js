'use strict';
module.exports = (sequelize, DataTypes) => {
  var User_Branch = sequelize.define('User_Branch', {
    UserId: DataTypes.INTEGER,
    BranchId: DataTypes.INTEGER
  }, {});
  User_Branch.associate = function(models) {
    User_Branch.belongsTo(models.User, {through: 'User_Branch'});
    User_Branch.belongsTo(models.Branch, {through: 'User_Branch'});  
  };
  return User_Branch;
};