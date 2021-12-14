'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScheduleUser extends Model {
    static associate(models) {
      ScheduleUser.belongsTo(models.User, {
        foreignKey: 'user_id',
      });

      ScheduleUser.belongsTo(models.Schedule, {
        foreignKey: 'schedule_id',
      });
    }
  };

  ScheduleUser.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    schedule_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ScheduleUser',
  });

  return ScheduleUser;
};