// 사용자가 선택했던 음식들 상세 페이지

import "../../CSS/FoodDetail.css";

import React from "react";
import axios from "axios";
import { useState } from "react";

export default function FoodDetail({
  selectedFood,
  backToMenuHandler,
  setShowChosenFoodsModal,
  setChosenFoods,
}) {
  const [deleteItems, setDeleteItems] = useState([]);

  const closeBtnHandler = () => {
    backToMenuHandler();
    setShowChosenFoodsModal(false);
  };

  const checkBoxChangeHandler = (event) => {
    const { checked, name } = event.target;
    if (checked) {
      setDeleteItems([...deleteItems, name]);
    } else {
      setDeleteItems(deleteItems.filter((item) => item !== name));
    }
  };

  const userChoiceBtnHandler = (event) => {
    event.preventDefault();
    if (deleteItems.length === 0) {
      alert("음식을 선택해주세요!");
      return;
    }
    // 사용자가 삭제하고자 하는 음식 서버에 전송
    const token = sessionStorage.getItem("token");
    axios
      .post(
        "http://localhost:8000/selectrecord/deleteChoice",
        { deleteItems: deleteItems },
        { headers: { authorization: token } }
      )
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setChosenFoods(response.data.newChosenFoods);
          alert("제출이 완료되었습니다!");
        } else {
          alert("오류가 발생했습니다.");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("오류가 발생했습니다.");
      });
  };

  return (
    <div id="foodDetail">
      <div
        id="backBtn"
        style={{
          cursor: "pointer",
          position: "fixed",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
          style={{ width: "35px", height: "35px" }}
          onClick={backToMenuHandler}
        >
          <path
            fill-rule="evenodd"
            d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
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
      <div id="food-content">
        <h1 style={{ margin: "0px", marginBottom: "0px", marginTop: "20px" }}>
          {selectedFood.mainFoodType}
        </h1>
        <p
          style={{
            fontSize: "20px",
            fontWeight: "900",
            color: "#224B0C",
          }}
        >
          <b style={{ fontSize: "30px" }}>👨🏻‍🍳</b> 삭제하고 싶은 음식을
          선택해주세요
          <b style={{ fontSize: "30px" }}>👨🏻‍🍳</b>
        </p>
        <table id="foodDetail-table">
          <thead>
            <tr>
              <th className="foodDetail-th">Food Item</th>
              <th className="foodDetail-th">Calories (kcal)</th>
              <th className="foodDetail-th">Protein (g)</th>
              <th className="foodDetail-th">Fat (g)</th>
              <th className="foodDetail-th">Carbohydrates (g)</th>
              <th className="foodDetail-th">Sugar (g)</th>
              <th className="foodDetail-th">Sodium (mg)</th>
              <th className="foodDetail-th">Cholesterol (mg)</th>
              <th className="foodDetail-th">Saturated Fatty Acid (g)</th>
              <th className="foodDetail-th">Trans Fatty Acid (g)</th>
              <th className="foodDetail-th">선택</th>
            </tr>
          </thead>
          <tbody>
            {selectedFood.content.map((elem, index) => {
              return (
                <tr key={index}>
                  <td className="foodDetail-td">{elem.name}</td>
                  <td className="foodDetail-td">{elem.calorie}</td>
                  <td className="foodDetail-td">{elem.protein}</td>
                  <td className="foodDetail-td">{elem.fat}</td>
                  <td className="foodDetail-td">{elem.carbohydrate}</td>
                  <td className="foodDetail-td">{elem.sugar}</td>
                  <td className="foodDetail-td">{elem.sodium}</td>
                  <td className="foodDetail-td">{elem.cholesterol}</td>
                  <td className="foodDetail-td">{elem.saturatedFattyAcid}</td>
                  <td className="foodDetail-td">{elem.transFattyAcid}</td>
                  <td className="foodDetail-td">
                    <input
                      type="checkbox"
                      name={elem.name}
                      onChange={checkBoxChangeHandler}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button
        id="userChoice-btn"
        onClick={userChoiceBtnHandler}
        style={{ marginLeft: "1280px" }}
      >
        삭제하기
      </button>
    </div>
  );
}
