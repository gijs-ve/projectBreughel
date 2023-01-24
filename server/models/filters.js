'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class filters extends Model {
        static associate(models) {
            filters.hasMany(models.paintingfilters);
        }
    }
    filters.init(
        {
            name: DataTypes.STRING,
            allowNull: false,
        },
        {
            sequelize,
            modelName: 'filters',
        },
    );
    return filters;
};
