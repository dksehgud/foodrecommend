const SelectRecord = require('../models/selectrecord');
const FoodItem = require('../models/fooditem');
const User = require('../models/user');
const { Sequelize } = require('sequelize');

// 나머지 Sequelize 관련 설정

//모든 기록 가져오기
exports.getAllRecord = async (req, res, next) => {
  try {
      const userId = res.locals.decoded.userId; // 로그인된 사용자의 ID를 가져옴
  
      const selectRecords = await SelectRecord.findAll({
        where: {
          userID: userId,
        },
        include: {
          model: FoodItem,
        },
      });

      res.json(selectRecords);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }        
};

//해당유저 기록 가져오기
exports.getRecord = async (req, res, next) => {
try {
  const user = await User.findOne({
    where: { userId: res.locals.decoded.userId },
    raw : true, });

    if(user){
      const selectRecords = await SelectRecord.findAll({
        where: {
          userName: user.userId,
        },
      });
  
      const foodNames = selectRecords.map(record => record.foodName);
      const foods = await FoodItem.findAll({
        where: { name: foodNames },
        attributes: [
          'name',
          'calorie',
          'protein',
          'fat',
          'carbohydrate',
          'sugar',
          'sodium',
          'cholesterol',
          'saturatedFattyAcid',
          'transFattyAcid',
          'mainFoodType',
        ],
      }); 
      const chosenFoods = foods.map(foodItem => ({
        mainFoodTypeImg: `${foodItem.dataValues.mainFoodType}.jpg`,
        mainFoodType: foodItem.dataValues.mainFoodType,
        content: [{
          name: foodItem.dataValues.name,
          calorie: foodItem.dataValues.calorie,
          protein: foodItem.dataValues.protein,
          fat: foodItem.dataValues.fat,
          carbohydrate: foodItem.dataValues.carbohydrate,
          sugar: foodItem.dataValues.sugar,
          sodium: foodItem.dataValues.sodium,
          cholesterol: foodItem.dataValues.cholesterol,
          saturatedFattyAcid: foodItem.dataValues.saturatedFattyAcid,
          transFattyAcid: foodItem.dataValues.transFattyAcid,
        }],
      }));

      return res.status(200).json({chosenFoods});
    } else {
      return res.status(419).json({success : false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }        
};

exports.choice = async (req, res, next) => {
  try {  
    const { checkedItems } = req.body;
    const user = await User.findOne({
      where: { userId: res.locals.decoded.userId },
      raw : true, });
      
    if(user){
      if (checkedItems && checkedItems.length > 0) {
         // checkedItems가 배열인 경우
        const createPromises = checkedItems.map(async (item) => {
          await SelectRecord.create({
            foodName: item,
            userName: user.userId,
          });
        });

        await Promise.all(createPromises);

        res.status(200).json({ success: true });
      } else {
        // checkedItems가 없는 경우에 대한 처리
        res.status(400).json({ success: false, message: "No items to create." });
      }
    }

  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.deleteRecord = async (req, res, next) => {
  try {
    
    const { deleteItems } = req.body;
    const user = await User.findOne({
      where: { userId: res.locals.decoded.userId },
      raw : true, });

    if(user){
      if(deleteItems){
        const createPromises = deleteItems.map(async (item) => {
          await SelectRecord.destroy({
            where: {
              userName: user.userId,
              foodName: item, // 이 부분은 실제 데이터 모델에 맞게 수정해야 합니다.
            },
          });
        });

        await Promise.all(createPromises);

        const selectRecords = await SelectRecord.findAll({
          where: {
            userName: user.userId,
          },
        });
    
        const foodNames = selectRecords.map(record => record.foodName);
        const foods = await FoodItem.findAll({
          where: { name: foodNames },
          attributes: [
            'name',
            'calorie',
            'protein',
            'fat',
            'carbohydrate',
            'sugar',
            'sodium',
            'cholesterol',
            'saturatedFattyAcid',
            'transFattyAcid',
            'mainFoodType',
          ],
        }); 
        const chosenFoods = foods.map(foodItem => ({
          mainFoodTypeImg: `${foodItem.dataValues.mainFoodType}.jpg`,
          mainFoodType: foodItem.dataValues.mainFoodType,
          content: [{
            name: foodItem.dataValues.name,
            calorie: foodItem.dataValues.calorie,
            protein: foodItem.dataValues.protein,
            fat: foodItem.dataValues.fat,
            carbohydrate: foodItem.dataValues.carbohydrate,
            sugar: foodItem.dataValues.sugar,
            sodium: foodItem.dataValues.sodium,
            cholesterol: foodItem.dataValues.cholesterol,
            saturatedFattyAcid: foodItem.dataValues.saturatedFattyAcid,
            transFattyAcid: foodItem.dataValues.transFattyAcid,
          }],
        }));

        res.status(200).json({ newChosenFoods: chosenFoods });
      }
    }

  } catch (error) {
    console.error(error);
    next(error);
  }
};