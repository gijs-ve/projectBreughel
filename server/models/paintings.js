'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paintings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Paintings.init({
    name: DataTypes.STRING,
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    isApproved: DataTypes.BOOLEAN,
    isPurchaseable: DataTypes.BOOLEAN,
    isSold: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Paintings',
  });
  return Paintings;
};