// 영양소 분석 모달창

import "../../CSS/ViewDetails.css";

import { useEffect, useState } from "react";

import React from "react";

export default function ViewDetails({
  userName,
  userNutrientRequirement,
  dailyFoodInfo,
  lackNutrientInfo,
  setShowViewDetails,
}) {
  const closeBtnHandler = () => {
    setShowViewDetails(false);
  };

  // dailyFoodInfoTest 상태를 관리하기 위한 state 추가
  const [totalCalorie, setTotalCalorie] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalCarbohydrate, setTotalCarbohydrate] = useState(0);
  const [totalSugar, setTotalSugar] = useState(0);
  const [totalSodium, setTotalSodium] = useState(0);
  const [totalCholesterol, setTotalCholesterol] = useState(0);
  const [totalSaturatedFattyAcid, setTotalSaturatedFattyAcid] = useState(0);
  const [totalTransFattyAcid, setTotalTransFattyAcid] = useState(0);

  // dailyFoodInfoTest 배열이 변경될 때 총합을 다시 계산
  useEffect(() => {
    const calculateTotals = () => {
      let calorie = 0;
      let protein = 0;
      let fat = 0;
      let carbohydrate = 0;
      let sugar = 0;
      let sodium = 0;
      let cholesterol = 0;
      let saturatedFattyAcid = 0;
      let transFattyAcid = 0;

      // dailyFoodInfoTest 배열을 순회하면서 총합 계산
      dailyFoodInfo.forEach((elem) => {
        calorie += elem.calorie;
        protein += elem.protein;
        fat += elem.fat;
        carbohydrate += elem.carbohydrate;
        sugar += elem.sugar;
        sodium += elem.sodium;
        cholesterol += elem.cholesterol;
        saturatedFattyAcid += elem.saturatedFattyAcid;
        transFattyAcid += elem.transFattyAcid;
      });

      // 계산된 총합을 state에 업데이트
      setTotalCalorie(calorie.toFixed(2));
      setTotalProtein(protein.toFixed(2));
      setTotalFat(fat.toFixed(2));
      setTotalCarbohydrate(carbohydrate.toFixed(2));
      setTotalSugar(sugar.toFixed(2));
      setTotalSodium(sodium.toFixed(2));
      setTotalCholesterol(cholesterol.toFixed(2));
      setTotalSaturatedFattyAcid(saturatedFattyAcid.toFixed(2));
      setTotalTransFattyAcid(transFattyAcid.toFixed(2));
    };

    calculateTotals();
  }, [dailyFoodInfo]);

  return (
    <div id="viewDetails">
      <div
        id="viewDetails-closeBtn"
        style={{
          cursor: "pointer",
          position: "fixed",
          top: "22px",
          right: "12px",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
          style={{ width: "40px", height: "40px" }}
          onClick={closeBtnHandler}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div id="viewDetail-content">
        <h2>{userName}님의 영양소 필요량</h2>
        <table id="viewDetail-table1">
          <thead>
            <tr>
              <th className="viewDetail-th1">Calories (kcal)</th>
              <th className="viewDetail-th1">Protein (g)</th>
              <th className="viewDetail-th1">Fat (g)</th>
              <th className="viewDetail-th1">Carbohydrates (g)</th>
              <th className="viewDetail-th1">Sugar (g)</th>
              <th className="viewDetail-th1">Sodium (mg)</th>
              <th className="viewDetail-th1">Cholesterol (mg)</th>
              <th className="viewDetail-th1">Saturated Fatty Acid (g)</th>
              <th className="viewDetail-th1">Trans Fatty Acid (g)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="viewDetail-td1">
                {userNutrientRequirement.calorie}
              </td>
              <td className="viewDetail-td1">
                {userNutrientRequirement.protein}
              </td>
              <td className="viewDetail-td1">{userNutrientRequirement.fat}</td>
              <td className="viewDetail-td1">
                {userNutrientRequirement.carbohydrate}
              </td>
              <td className="viewDetail-td1">
                {userNutrientRequirement.sugar}
              </td>
              <td className="viewDetail-td1">
                {userNutrientRequirement.sodium}
              </td>
              <td className="viewDetail-td1">
                {userNutrientRequirement.cholesterol}
              </td>
              <td className="viewDetail-td1">
                {userNutrientRequirement.saturatedFattyAcid}
              </td>
              <td className="viewDetail-td1">
                {userNutrientRequirement.transFattyAcid}
              </td>
            </tr>
          </tbody>
        </table>
        <h2>오늘 섭취한 음식</h2>
        <table id="viewDetail-table2">
          <thead>
            <tr>
              <th className="viewDetail-th2">Food Item</th>
              <th className="viewDetail-th2">Serving Size (g)</th>
              <th className="viewDetail-th2">Calories (kcal)</th>
              <th className="viewDetail-th2">Protein (g)</th>
              <th className="viewDetail-th2">Fat (g)</th>
              <th className="viewDetail-th2">Carbohydrates (g)</th>
              <th className="viewDetail-th2">Sugar (g)</th>
              <th className="viewDetail-th2">Sodium (mg)</th>
              <th className="viewDetail-th2">Cholesterol (mg)</th>
              <th className="viewDetail-th2">Saturated Fatty Acid (g)</th>
              <th className="viewDetail-th2">Trans Fatty Acid (g)</th>
            </tr>
          </thead>
          <tbody>
            {dailyFoodInfo.map((elem, index) => {
              return (
                <tr key={index}>
                  <td className="viewDetail-td2">{elem.name}</td>
                  <td className="viewDetail-td2">{elem.servingSize}</td>
                  <td className="viewDetail-td2">{elem.calorie}</td>
                  <td className="viewDetail-td2">{elem.protein}</td>
                  <td className="viewDetail-td2">{elem.fat}</td>
                  <td className="viewDetail-td2">{elem.carbohydrate}</td>
                  <td className="viewDetail-td2">{elem.sugar}</td>
                  <td className="viewDetail-td2">{elem.sodium}</td>
                  <td className="viewDetail-td2">{elem.cholesterol}</td>
                  <td className="viewDetail-td2">{elem.saturatedFattyAcid}</td>
                  <td className="viewDetail-td2">{elem.transFattyAcid}</td>
                </tr>
              );
            })}
            <tr>
              <td className="viewDetail-td2">총 섭취량</td>
              <td className="viewDetail-td2"></td>
              <td className="viewDetail-td2">{totalCalorie}</td>
              <td className="viewDetail-td2">{totalProtein}</td>
              <td className="viewDetail-td2">{totalFat}</td>
              <td className="viewDetail-td2">{totalCarbohydrate}</td>
              <td className="viewDetail-td2">{totalSugar}</td>
              <td className="viewDetail-td2">{totalSodium}</td>
              <td className="viewDetail-td2">{totalCholesterol}</td>
              <td className="viewDetail-td2">{totalSaturatedFattyAcid}</td>
              <td className="viewDetail-td2">{totalTransFattyAcid}</td>
            </tr>
          </tbody>
        </table>
        <h2>분석 결과</h2>
        <table id="viewDetail-table3">
          <thead>
            <tr>
              <th className="viewDetail-th3"></th>
              <th className="viewDetail-th3">Calories (kcal)</th>
              <th className="viewDetail-th3">Protein (g)</th>
              <th className="viewDetail-th3">Fat (g)</th>
              <th className="viewDetail-th3">Carbohydrates (g)</th>
            </tr>
          </thead>
          <tbody>
            {lackNutrientInfo.map((elem, index) => {
              if (index === lackNutrientInfo.length - 1) {
                return (
                  <tr key={index}>
                    <td className="viewDetail-td3">{elem.name}</td>
                    <td
                      className={`viewDetail-td3 ${
                        elem.calorie === "부족"
                          ? "lack"
                          : elem.calorie === "만족"
                          ? "sufficient"
                          : ""
                      }`}
                    >
                      {elem.calorie}
                    </td>
                    <td
                      className={`viewDetail-td3 ${
                        elem.protein === "부족"
                          ? "lack"
                          : elem.protein === "만족"
                          ? "sufficient"
                          : ""
                      }`}
                    >
                      {elem.protein}
                    </td>
                    <td
                      className={`viewDetail-td3 ${
                        elem.fat === "부족"
                          ? "lack"
                          : elem.fat === "만족"
                          ? "sufficient"
                          : ""
                      }`}
                    >
                      {elem.fat}
                    </td>
                    <td
                      className={`viewDetail-td3 ${
                        elem.carbohydrate === "부족"
                          ? "lack"
                          : elem.carbohydrate === "만족"
                          ? "sufficient"
                          : ""
                      }`}
                    >
                      {elem.carbohydrate}
                    </td>
                  </tr>
                );
              }
              return (
                <tr key={index}>
                  <td className="viewDetail-td3">{elem.name}</td>
                  <td className="viewDetail-td3">{elem.calorie}</td>
                  <td className="viewDetail-td3">{elem.protein}</td>
                  <td className="viewDetail-td3">{elem.fat}</td>
                  <td className="viewDetail-td3">{elem.carbohydrate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}