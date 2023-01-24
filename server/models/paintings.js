'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class paintings extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            paintings.hasMany(models.paintingimages);
            paintings.hasMany(models.paintingfilters);
        }
    }
    paintings.init(
        {
            name: DataTypes.STRING,
            artist: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            width: DataTypes.INTEGER,
            height: DataTypes.INTEGER,
            price: DataTypes.INTEGER,
            isApproved: DataTypes.BOOLEAN,
            isPurchaseable: DataTypes.BOOLEAN,
            isSold: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'paintings',
        },
    );
    return paintings;
};
