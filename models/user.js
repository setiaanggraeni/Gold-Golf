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
    },
    gender: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        if(user.gender === "female"){
          user.firstName = `Mrs. ${user.firstName}`;
        } else{
          user.firstName = `Mr. ${user.firstName}`;
        }
      }
    }
  });
  
  User.associate = function(models) {
    User.belongsToMany(models.Branch, {through: 'User_Branch'})
  };

  // instance method
  User.prototype.getFullName = function(){
    return `${this.firstName} ${this.lastName}`
  }

  // class method
  User.getArea = function (areaId) {
    return User.findAll({
      where: {areaId}
    })
  }
  
  return User;
};