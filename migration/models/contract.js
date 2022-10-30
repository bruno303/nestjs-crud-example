'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  contract.init({
    id: DataTypes.UUID,
    number: DataTypes.STRING,
    date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'contract',
  });
  return contract;
};