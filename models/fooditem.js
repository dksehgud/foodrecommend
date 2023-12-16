const Sequelize = require('sequelize');

class FoodItem extends Sequelize.Model {
  static initiate(sequelize) {
    FoodItem.init({
      code: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: "",
      },
      mainFoodType: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "",
      },
      detailedFoodType: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "",
      },
      mainIngredient: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: '알 수 없음',
      },
      secondaryIngredient: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: '알 수 없음',
      },
      allergens: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: '없음',
      },
      taste: {
        type: Sequelize.STRING(20),//ENUM('단맛', '담백한맛', '짠맛', '신맛', '알 수 없음'),
        allowNull: false,
        defaultValue: '알 수 없음',
      },
      cookMethod: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: '알 수 없음',
      },
      servingSize: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      calorie: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      protein: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      fat: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      carbohydrate: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      sugar: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      cholesterol: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      sodium: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      saturatedFattyAcid: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      transFattyAcid: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'FoodItem',
      tableName: 'FoodItems',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  
  static associate(db) {
    db.FoodItem.belongsTo(db.User);
    db.FoodItem.belongsTo(db.SelectRecord);
  }
};

module.exports = FoodItem;
