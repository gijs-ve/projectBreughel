'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class paintings extends Model {
        static associate(models) {
            paintings.hasMany(models.paintingimages);
            paintings.hasMany(models.paintingfilters);
            paintings.belongsTo(models.painters);
        }
    }
    paintings.init(
        {
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            width: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            height: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            price: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            isApproved: {
                allowNull: false,
                defaultValue: false,
                type: DataTypes.BOOLEAN,
            },
            isPurchaseable: {
                type: DataTypes.BOOLEAN,
            },
            isSold: {
                type: DataTypes.BOOLEAN,
            },
        },
        {
            sequelize,
            modelName: 'paintings',
        },
    );
    return paintings;
};
