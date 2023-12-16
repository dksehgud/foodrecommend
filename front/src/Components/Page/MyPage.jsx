// 개인정보 수정 페이지

import "../../CSS/MyPage.css";

import { useEffect, useState } from "react";

import ChosenFoods from "../Modal/ChosenFoods";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";

export default function MyPage() {
  const [userName, setUserName] = useState("");
  const [showChosenFoodsModal, setShowChosenFoodsModal] = useState(false);
  const [chosenFoods, setChosenFoods] = useState([]);

  useEffect(() => {
    const fetchChosenFoods = async () => {
      try {
        // 서버로부터 사용자가 선택했던 음식들 받아오기
        const token = sessionStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/selectrecord/getRecord", {
          headers: { authorization: token },
        });
        setChosenFoods(response.data.chosenFoods);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChosenFoods();
  }, []);

  useEffect(() => {
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    try {
      // 서버로부터 사용자 이름을 가져오기
      // 사용자 프로필에 이름 넣어주기 위해
      const token = sessionStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/user/name", {
        headers: { authorization: token },
      });
      setUserName(response.data.userName); // userName을 서버로부터 받은 사용자 이름으로 설정
    } catch (error) {
      console.error(error);
    }
  };

  const viewChosenFoodsHandler = () => {
    setShowChosenFoodsModal(true);
  };

  return (
    <div className="mypage">
      <div id="mypage-box" className="slide-in-fwd-center">
        <div id="profile-image"></div>
        <div id="profile-content">
          <p style={{ fontSize: "30px", marginBottom: "40px" }}>
            {userName} 님
          </p>
          <Link
            to="/editpersonalinfo"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <p
              style={{
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              개인정보
              수정하기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </p>
          </Link>
          <p
            onClick={viewChosenFoodsHandler}
            style={{
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            내가 좋아한 음식 확인하기&nbsp;&nbsp;&nbsp;&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </p>
        </div>
      </div>
      {showChosenFoodsModal ? (
        <ChosenFoods
          userName={userName}
          chosenFoods={chosenFoods}
          setChosenFoods={setChosenFoods}
          setShowChosenFoodsModal={setShowChosenFoodsModal}
        />
      ) : null}
    </div>
  );
}
