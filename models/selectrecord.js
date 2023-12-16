const Sequelize = require('sequelize');

class SelectRecord extends Sequelize.Model {
  static initiate(sequelize) {
    SelectRecord.init({
      foodName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      userName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },

    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'SelectRecord',
      tableName: 'selectrecord',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.SelectRecord.hasMany(db.FoodItem);
    db.SelectRecord.belongsTo(db.User);
  }
};

module.exports = SelectRecord;

