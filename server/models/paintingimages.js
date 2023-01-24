'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class paintingimages extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            paintingimages.belongTo(models.paintings);
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
