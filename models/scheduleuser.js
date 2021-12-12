'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScheduleUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ScheduleUser.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });

      ScheduleUser.belongsTo(models.Schedule, {
        foreignKey: 'schedule_id',
        as: 'schedule',
      });
    }
  };
  ScheduleUser.init({
    schedule_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ScheduleUser',
  });
  return ScheduleUser;
};