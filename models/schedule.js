'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    static associate(models) {
      Schedule.belongsToMany(models.User, {
        through: "ScheduleUsers",
        foreignKey: "schedule_id",
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