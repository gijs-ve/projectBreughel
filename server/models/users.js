'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        static associate(models) {
        }
    }
    users.init(
        {
            name: { type: DataTypes.STRING, allowNull: false },
            password: DataTypes.STRING,
            mail: DataTypes.STRING,
            isAdmin: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'users',
        },
    );
    return users;
};
