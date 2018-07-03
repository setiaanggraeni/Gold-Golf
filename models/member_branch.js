'use strict';
module.exports = (sequelize, DataTypes) => {
  var Member_Branch = sequelize.define('Member_Branch', {
    BranchId: DataTypes.INTEGER,
    MemberId: DataTypes.INTEGER
  }, {});
  Member_Branch.associate = function(models) {
    // associations can be defined here
  };
  return Member_Branch;
};