const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init({
      userId: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      gender: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: '여자',
      },
      height: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10,
      },
      weight: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10,
      },
      meatConsumption: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: '한다',
      },
      activityLevel: {//줄꺼
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: '활동적',
      },
      spicinessPreference: {//줄꺼
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: '매움',
      },
      flavorPreference: {//줄꺼
        type: Sequelize.STRING(15),
        allowNull: false,
        defaultValue: '짠맛',
      },
      newFoodPreference: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: '그렇다',
      },
      foodTypePreference: {//줄꺼
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: '한식',
      },
      dailyFoodIntake: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: "",
      },
      dailyFoodIntake_admin: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: "",
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.FoodItem);
  }
};

module.exports = User;
