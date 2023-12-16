const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const xlsx = require('xlsx');

exports.join = async (req, res, next) => {
  const { joinFormData } = req.body;
  try {
    const user = await User.findOne({ where: { userId: joinFormData.userId } });
    if (user) {
      return res.status(400).json({ success: false });
    }

    const hash = await bcrypt.hash(joinFormData.password, 12);
    await User.create({
      userId : joinFormData.userId,
      name : joinFormData.name,
      password : hash,
      gender : joinFormData.gender,
      height : joinFormData.height,
      weight : joinFormData.weight,
      age : joinFormData.age,
      meatConsumption : joinFormData.meatConsumption,
      activityLevel : joinFormData.activityLevel,
      spicinessPreference : joinFormData.spicinessPreference,
      flavorPreference : joinFormData.flavorPreference,
      newFoodPreference : joinFormData.newFoodPreference,
      foodTypePreference : joinFormData.foodTypePreference,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

exports.login = async (req, res, next) => {
  try { 
    const user = await User.findOne({ where: { userId: req.body.id } });
    if (user) {
      const result = await bcrypt.compare(req.body.pw, user.password);  

      if (result) {
        // 로그인 성공시 JWT 토큰 생성
        const token = jwt.sign(
          {
            userId: user.userId,
          },
          //expiresIn 토큰 만료시간 1시간, issuer(발급자) foodrecommend
          process.env.JWT_SECRET, { expiresIn: '50m', issuer: 'foodrecommend' }
        );
        return res.status(200).json({ token });
      } else {
        return res.status(400).json({ success: false });
      }
    } else {
      return res.status(401).json({ success: false });
    }
  } catch (error){
    console.error(error);
    return next(error);
  }
};

exports.userName = async (req, res, next) => {
  try { 
    const user = await User.findOne({ where: { userId: res.locals.decoded.userId } });
    if(user){
      res.status(200).json({ userName: user.name });
    }
  } catch (error){
    console.error(error);
    return next(error);
  }
};

exports.userInfo = async (req, res, next) => {
  try { 
    const user = await User.findOne({ where: { userId: res.locals.decoded.userId } });
    user.password = "";
    if(user){
      return res.status(200).json({ userInfo: user });
    }
  } catch (error){
    console.error(error);
    return next(error);
  }
};

exports.updateUserInfo = async (req, res, next) => {
  try { 
    const { userInfo } = req.body;
    const hash = await bcrypt.hash(userInfo.password, 12);
    const [user] = await User.update({ 
      name : userInfo.name,
      password : hash,
      gender : userInfo.gender,
      height : userInfo.height,
      weight : userInfo.weight,
      age : userInfo.age,
      meatConsumption : userInfo.meatConsumption,
      activityLevel : userInfo.activityLevel,
      spicinessPreference : userInfo.spicinessPreference,
      flavorPreference : userInfo.flavorPreference,
      newFoodPreference : userInfo.newFoodPreference,
      foodTypePreference : userInfo.foodTypePreference, }, {
      where: { userId: res.locals.decoded.userId },
      });
    console.log(`Updated ${user} row(s)`);
    return res.status(200).json({ success: true });
  } catch (error){
    console.error(error);
    return next(error);
  }
};