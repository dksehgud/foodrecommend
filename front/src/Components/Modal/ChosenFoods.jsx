// 사용자가 선택했던 음식을 확인할 수 있는 모달창

import "../../CSS/ChosenFoods.css";

import FoodDetail2 from "./FoodDetail2";
import MainFoodTypeBox from "./MainFoodTypeBox";
import { useState } from "react";

export default function ChosenFoods({
  userName,
  chosenFoods,
  setChosenFoods,
  setShowChosenFoodsModal,
}) {
  const [selectedFood, setSelectedFood] = useState(null);
  const closeBtnHandler = () => {
    setShowChosenFoodsModal(false);
  };
  const selectFoodHandler = (food) => {
    setSelectedFood(food);
  };
  const backToMenuHandler = () => {
    setSelectedFood(null);
  };
  return (
    <>
      <div id="chosenFoods">
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
          {userName}님이 좋아하셨던 음식들입니다
          <b style={{ fontSize: "35px" }}>😃</b>
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
        </p>
        <div id="mainFoodType-boxes">
          {chosenFoods.map((item, index) => {
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
        <FoodDetail2
          selectedFood={selectedFood}
          backToMenuHandler={backToMenuHandler}
          setShowChosenFoodsModal={setShowChosenFoodsModal}
          setChosenFoods={setChosenFoods}
        />
      ) : null}
    </>
  );
}
