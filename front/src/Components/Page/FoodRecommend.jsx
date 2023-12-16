// 음식 추천 화면
// 일일 섭취 음식 name: dailyFood value: dailyfood

import "../../CSS/FoodRecommend.css";

import { useEffect, useState } from "react";

import FoodRecommendModal from "../Modal/FoodRecommendModal";
import ViewDetails from "../Modal/ViewDetails";
import axios from "axios";

function FoodRecommend() {
  const [dailyFood, setDailyFood] = useState(""); // 사용자로부터 입력받은 일일 섭취 음식을 저장할 변수
  const [userName, setUserName] = useState(""); // 서버로부터 가져온 사용자 이름을 저장할 변수
  const [recommendedFoods, setRecommendedFoods] = useState([]); // 서버로부터 가져온 추천 음식 리스트를 저장할 변수
  const [dailyFoodInfo, setDailyFoodInfo] = useState([]); // 서버로부터 가져온 일일 섭취 음식 정보를 저장할 변수
  const [userNutrientRequirement, setUserNutrientRequirement] = useState([]); // 서버로부터 가져온 사용자 영양소 필요량 정보를 저장할 변수
  const [lackNutrientInfo, setLackNutrientInfo] = useState([]); //서버로부터 가져온 사용자의 현재 영양소 충족 상황 정보를 저장할 변수
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [showFoodRecommendModal, setShowFoodRecommendModal] = useState(false);

  const onDailyFoodHandler = (event) => {
    setDailyFood(event.currentTarget.value);
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    try {
      // 서버로부터 사용자 이름을 가져오기
      const token = sessionStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/user/name", {
        headers: { authorization: token },
      });
      setUserName(response.data.userName); // userName을 서버로부터 받은 사용자 이름으로 설정
    } catch (error) {
      console.error(error);
    }
  };

  // 부족한 영양소 확인하기 버튼 누르면 실행되는 함수
  const nutrientAnalysisBtnHandler = (event) => {
    event.preventDefault();
    // 일일 섭취 음식 서버에 전송
    // 서버로부터 사용자 영양소 필요량 정보, 일일 섭취 음식 정보, 사용자의 현재 영양소 충족 상황, 추천 음식 리스트 받아오기
    if (!dailyFood.trim()) {
      alert("오늘 먹은 음식을 입력해주세요");
      return;
    }
    const token = sessionStorage.getItem("token");
    axios
      .post("http://localhost:8000/foodRecommend", {
        dailyFood: dailyFood === "공복" ? "" : dailyFood,
        headers: { authorization: token },
      })
      .then(function (response) {
        console.log(dailyFood);
        console.log(response);
        if (response.status === 200) {
          setRecommendedFoods(response.data.recommendedFoods); // 서버로부터 받은 추천 음식 리스트 저장
          setDailyFoodInfo(response.data.dailyFoodInfo); // 서버로부터 받은 섭취 음식 영양소 정보 저장
          setUserNutrientRequirement(response.data.userNutrientRequirement); // 서버로부터 받은 개인 영양소 필요량 정보
          setLackNutrientInfo(response.data.lackNutrientInfo); // 서버로부터 받은 부족한 영양소 정보
          setShowAnalysis(true);
        } else {
          alert("데이터를 불러오는데 실패했습니다.");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("오류가 발생했습니다.");
      });
  };

  const viewDetailsBtnHandler = () => {
    setShowViewDetails(true);
  };

  const foodRecommendBtnHandler = () => {
    setShowFoodRecommendModal(true);
  };

  const backBtnHandler = () => {
    setShowAnalysis(false);
  };

  return (
    <div className="foodRecommend">
      <div id="foodRecommend-box">
        {!showAnalysis ? (
          <form id="foodRecommend-form" className="scale-up-center">
            <label className="foodRecommend-label">
              <p
                style={{
                  fontSize: "31px",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {userName}님, 오늘 어떤 음식을 드셨나요?
              </p>
              <p
                style={{
                  fontSize: "17px",
                  textAlign: "center",
                  marginBottom: "30px",
                }}
              >
                콤마(,)로 구분해서 작성해주세요😃
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  textAlign: "center",
                  marginBottom: "30px",
                  color: "#9A031E",
                }}
              >
                첫 식사라면 '공복'이라고 입력해주세요!
              </p>
              <input
                type="text"
                name="dailyFood"
                value={dailyFood}
                onChange={onDailyFoodHandler}
                className="foodRecommend-input"
              />
            </label>

            <button
              type="submit"
              onClick={nutrientAnalysisBtnHandler}
              id="nutrientAnalysisBtn"
            >
              부족한 영양소 확인하기
            </button>
          </form>
        ) : null}
        {showAnalysis ? (
          <div id="nutrientAnalysis-contents" className="slide-in-bottom">
            <h2
              style={{
                fontSize: "27px",
                marginTop: "100px",
                marginBottom: "35px",
              }}
            >
              {userName}님에게 부족한 영양소를 분석해 봤어요
              <b style={{ fontSize: "35px" }}>🧐</b>
            </h2>
            <table id="analysis-table">
              <thead>
                <tr>
                  <th className="analysis-th"></th>
                  <th className="analysis-th">Calories (kcal)</th>
                  <th className="analysis-th">Protein (g)</th>
                  <th className="analysis-th">Fat (g)</th>
                  <th className="analysis-th">Carbohydrates (g)</th>
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
                      <td className="analysis-td">{elem.name}</td>
                      <td className="analysis-td">{elem.calorie}</td>
                      <td className="analysis-td">{elem.protein}</td>
                      <td className="analysis-td">{elem.fat}</td>
                      <td className="analysis-td">{elem.carbohydrate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button id="backBtn2" onClick={backBtnHandler}>
              뒤로가기
            </button>
            <button id="viewDetailBtn" onClick={viewDetailsBtnHandler}>
              상세보기
            </button>
            <button id="foodRecommendBtn" onClick={foodRecommendBtnHandler}>
              음식 추천받기
            </button>
          </div>
        ) : null}
      </div>
      {showViewDetails ? (
        <ViewDetails
          userName={userName}
          userNutrientRequirement={userNutrientRequirement}
          dailyFoodInfo={dailyFoodInfo}
          lackNutrientInfo={lackNutrientInfo}
          setShowViewDetails={setShowViewDetails}
        />
      ) : null}
      {showFoodRecommendModal ? (
        <FoodRecommendModal
          userName={userName}
          recommendedFoods={recommendedFoods}
          setRecommendedFoods={setRecommendedFoods}
          setShowFoodRecommendModal={setShowFoodRecommendModal}
        />
      ) : (
        <div id="fakeBox"></div>
      )}
    </div>
  );
}

export default FoodRecommend;
