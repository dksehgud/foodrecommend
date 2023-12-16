// 음식 추천 모달창

import "../../CSS/FoodRecommendModal.css";

import FoodDetail from "./FoodDetail";
import MainFoodTypeBox from "./MainFoodTypeBox";
import React from "react";
import axios from "axios";
import { useState } from "react";

export default function FoodRecommendModal({
  userName,
  recommendedFoods,
  setRecommendedFoods,
  setShowFoodRecommendModal,
}) {
  const [selectedFood, setSelectedFood] = useState(null);

  const closeBtnHandler = () => {
    setShowFoodRecommendModal(false);
  };
  const selectFoodHandler = (food) => {
    setSelectedFood(food);
  };
  const backToMenuHandler = () => {
    setSelectedFood(null);
  };
  const recommendAgainBtnHandler = (event) => {
    event.preventDefault();
    // 서버로부터 새로운 추천 음식 리스트 받아오기
    const token = sessionStorage.getItem("token");
    axios
      .post("http://localhost:8000/foodRecommend", {
        headers: { authorization: token },
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setRecommendedFoods(response.data.newRecommendedFoods); // 서버로부터 받은 새로운 추천 음식 리스트 저장
        } else {
          alert("데이터를 불러오는데 실패했습니다.");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("오류가 발생했습니다.");
      });
  };

  return (
    <>
      <div id="modal">
        <div
          id="closeBtn"
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

        <h2 id="foodRecommendModal-title">
          {userName}님, 뭘 좋아하실지 몰라 종류별로 준비해 봤어요
          <b style={{ fontSize: "35px" }}>🤗</b>
        </h2>
        <p
          style={{
            fontSize: "25px",
            fontWeight: "900",
            color: "#00DFA2",
            marginLeft: "120px",
            marginTop: "0px",
          }}
        >
          Click to see foods! &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
          <span style={{ fontSize: "21px", color: "#D2001A" }}>
            음식이 마음에 안드시나요?
          </span>
          <button id="recommendAgainBtn" onClick={recommendAgainBtnHandler}>
            다시 추천 받기
          </button>
        </p>
        <div id="mainFoodType-boxes">
          {recommendedFoods.map((item, index) => {
            return (
              <MainFoodTypeBox
                key={index}
                recommendedFood={item}
                selectFoodHandler={selectFoodHandler}
              />
            );
          })}
        </div>
      </div>
      {selectedFood ? (
        <FoodDetail
          selectedFood={selectedFood}
          backToMenuHandler={backToMenuHandler}
          setShowFoodRecommendModal={setShowFoodRecommendModal}
        />
      ) : null}
    </>
  );
}
