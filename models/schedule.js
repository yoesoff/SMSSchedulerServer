'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Schedule.hasMany(models.ScheduleUser, {
        foreignKey: 'user_id'
      });
    }
  };

  Schedule.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
      primaryKey: true,
    },
    run_at: DataTypes.DATE,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};