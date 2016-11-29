'use strict';
module.exports = function(sequelize, DataTypes) {
  var Organization = sequelize.define('Organization', {
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Organization;
};