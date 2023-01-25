'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class paintingimages extends Model {
        static associate(models) {
            paintingimages.belongsTo(models.paintings);
        }
    }
    paintingimages.init(
        {
            url: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'paintingimages',
        },
    );
    return paintingimages;
};
