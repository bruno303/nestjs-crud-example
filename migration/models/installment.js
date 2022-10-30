'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class installment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  installment.init({
    id: DataTypes.UUID,
    contractId: DataTypes.UUID,
    number: DataTypes.INTEGER,
    dueDate: DataTypes.DATEONLY,
    amount: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'installment',
  });
  return installment;
};