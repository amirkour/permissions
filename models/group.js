'use strict';

module.exports = function(sequelize, DataTypes) {
    var Group = sequelize.define('Group', {
        name: {
            type: DataTypes.STRING,
            allowNull:false
        }
    }, {
        classMethods: {
            associate: function(models) {
                this.belongsTo(models.Organization, {
                    foreignKey: {
                        allowNull:false
                    }
                });
            }
        },

        tableName:'groups'
    });

    return Group;
};
