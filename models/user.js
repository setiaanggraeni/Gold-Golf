'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    BranchId: DataTypes.INTEGER,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    isAdmin: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.firstName = `Mr/Mrs. ${user.firstName}`;
      }
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Branch)
  };

  // instance method
  User.prototype.getFullName = function(){
    return `${this.firstName} ${this.lastName}`
  }

  // class method
  User.getAge = function (areaId) {
    return User.findAll({
      where: {areaId}
    })
  }
  return User;
};