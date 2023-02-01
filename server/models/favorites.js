'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class favorites extends Model {
        static associate(models) {
            favorites.belongsTo(models.paintings);
        }
    }
    favorites.init(
        {},
        {
            sequelize,
            modelName: 'favories',
        },
    );
    return favorites;
};
