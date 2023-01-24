'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class paintingfilters extends Model {
        static associate(models) {
            paintingfilters.belongsTo(models.paintings);
            paintingfilters.belongsTo(models.filters);
        }
    }
    paintingfilters.init(
        {},
        {
            sequelize,
            modelName: 'paintingfilters',
        },
    );
    return paintingfilters;
};
