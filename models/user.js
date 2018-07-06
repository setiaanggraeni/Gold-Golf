'use strict';

const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          args : true,
          msg: "Username is required"
        }
      }
    },
    password: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail:{
          args: true,
          msg : "Email format is incorrect"
        },
        isUnique (value, next){
          User.findAll({
            where: {
              email: value
            }
          })
          .then(emailUser => {
            if(emailUser.length == 0){
              next()
            } else{
              next('Email already exist!')
            }
          })
          .catch(err => {
            res.send(err.message)
          })
        }
      }
    },
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    BranchId: DataTypes.INTEGER,
    latitude: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          args : true,
          msg: "Latitude is required"
        }
      }
    },
    longitude: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          args : true,
          msg: "Longtitude is required"
        }
      }
    },
    isAdmin: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    gender: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        var salt = bcrypt.genSaltSync(5)
        var hash = bcrypt.hashSync(user.password, salt)
        user.password = hash
      },
    }
  });
  
  User.associate = function(models) {
    User.belongsToMany(models.Branch, {through: 'User_Branch'}),
    User.belongsTo(models.Branch)
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