'use strict';
module.exports = (sequelize, DataTypes) => {
  var User_Branch = sequelize.define('User_Branch', {
    UserId: DataTypes.INTEGER,
    BranchId: DataTypes.INTEGER,
    isPlaying : DataTypes.BOOLEAN,
    isFinished: DataTypes.BOOLEAN
  }, {});
  User_Branch.associate = function(models) {
    User_Branch.belongsTo(models.User);
    User_Branch.belongsTo(models.Branch);
  };
  return User_Branch;
};
