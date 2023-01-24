'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class painters extends Model {
        static associate(models) {
            painters.hasMany(models.paintings);
        }
    }
    painters.init(
        {},
        {
            sequelize,
            modelName: 'painters',
        },
    );
    return painters;
};
