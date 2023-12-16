// 개인정보 수정 페이지
// 아이디  name: userId  value: joinFormData.userId
// 비밀번호  name: password  value: joinFormData.password
// 이름  name: name  value: joinFormData.name
// 성별  name: gender  value: joinFormData.gender
// 나이  name: age  value: joinFormData.age
// 키  name: height  value: joinFormData.height
// 체중  name: weight  value: joinFormData.weight
// 활동 수준  name: activityLevel  value: joinFormData.activitiyLevel
// 육류 소비 유무 name: meatConsumption, value: joinFormData.meatConsumption
// 선호하는 맵기 정도  name: spicinessPreference  value: joinFormData.spicinessPreference
// 선호하는 맛  name: flavorPreference  value: joinFormData.flavorPreference
// 새로운 음식 선호 여부  name: newFoodPreference  value: joinFormData.newFoodPreference
// 선호 음식 종류  name:  foodTypePreference  value: joinFormData.foodTypePreference

import "../../CSS/Join.css";

import { useEffect, useState } from "react";

import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditPersonalInfo() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userId: "",
    password: "",
    name: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
    activityLevel: "",
    meatConsumption: "",
    spicinessPreference: "",
    flavorPreference: "",
    newFoodPreference: "",
    foodTypePreference: "",
  });
  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    // 사용자 정보를 불러옴
    const token = sessionStorage.getItem("token");
    axios
      .get("http://localhost:8000/user/info", {
        headers: { authorization: token },
      })
      .then((response) => {
        setUserInfo(response.data.userInfo);
        console.log(userInfo);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // 모든 필드가 채워져 있는지 확인
    setIsFormComplete(
      Object.values(userInfo).every((value) => {
        const stringValue = String(value);
        return stringValue.trim() !== "";
      })
    );
  }, [userInfo]);

  const handleJoinFormDataChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // 수정하기 버튼 누르면 실행되는 함수
  const updateBtnHandler = (event) => {
    event.preventDefault();
    // 서버에 수정된 개인정보 전달
    const token = sessionStorage.getItem("token");
    axios
      .post("http://localhost:8000/user/update", {
        userInfo: userInfo,
        headers: { authorization: token },
      })
      .then(function (response) {
        console.log(userInfo);
        console.log(response);
        if (response.status === 200) {
          alert("정보가 성공적으로 수정되었습니다!");
          navigate("/mypage");
        } else {
          alert("정보 수정에 실패했습니다.");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("오류가 발생했습니다.");
      });
  };

  return (
    <div className="join">
      <div id="join-box" className="fade-in">
        <p id="join-title">정보 수정</p>
        <form id="join-form">
          <div id="column1">
            <label className="column1-input">
              아이디:&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                name="userId"
                value={userInfo.userId}
                onChange={handleJoinFormDataChange}
                className="join-input"
              />
            </label>

            <label className="column1-input">
              비밀번호:&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="password"
                name="password"
                value={userInfo.password}
                onChange={handleJoinFormDataChange}
                className="join-input"
              />
            </label>

            <label className="column1-input">
              이름:&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleJoinFormDataChange}
                className="join-input"
              />
            </label>

            <label className="column1-input">
              성별:&nbsp;&nbsp;&nbsp;&nbsp;
              <select
                name="gender"
                value={userInfo.gender}
                onChange={handleJoinFormDataChange}
              >
                <option value="">선택</option>
                <option value="남자">남자</option>
                <option value="여자">여자</option>
              </select>
            </label>

            <label className="column1-input">
              나이:&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="number"
                name="age"
                value={userInfo.age}
                onChange={handleJoinFormDataChange}
                className="join-input"
              />
            </label>

            <label className="column1-input">
              키:&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="number"
                name="height"
                value={userInfo.height}
                onChange={handleJoinFormDataChange}
                className="join-input"
              />
            </label>

            <label className="column1-input">
              체중:&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="number"
                name="weight"
                value={userInfo.weight}
                onChange={handleJoinFormDataChange}
                className="join-input"
              />
            </label>
          </div>

          <div id="column2">
            <label className="column2-input">
              활동 수준:&nbsp;&nbsp;&nbsp;&nbsp;
              <select
                name="activityLevel"
                value={userInfo.activityLevel}
                onChange={handleJoinFormDataChange}
              >
                <option value="">선택하세요</option>
                <option value="비활동적">비활동적</option>
                <option value="저활동적">저활동적</option>
                <option value="활동적">활동적</option>
                <option value="매우 활동적">매우 활동적</option>
              </select>
            </label>

            <label className="column2-input">
              육류 소비 유무:&nbsp;&nbsp;&nbsp;&nbsp;
              <select
                name="meatConsumption"
                value={userInfo.meatConsumption}
                onChange={handleJoinFormDataChange}
              >
                <option value="">선택</option>
                <option value="한다">한다</option>
                <option value="안 한다">안 한다</option>
              </select>
            </label>

            <label className="column2-input">
              선호하는 맵기 정도:&nbsp;&nbsp;&nbsp;&nbsp;
              <select
                name="spicinessPreference"
                value={userInfo.spicinessPreference}
                onChange={handleJoinFormDataChange}
              >
                <option value="">선택하세요</option>
                <option value="안매움">안매움</option>
                <option value="조금 매움">조금 매움</option>
                <option value="매움">매움</option>
                <option value="아주 매움">아주 매움</option>
              </select>
            </label>

            <label className="column2-input">
              선호하는 맛:&nbsp;&nbsp;&nbsp;&nbsp;
              <select
                name="flavorPreference"
                value={userInfo.flavorPreference}
                onChange={handleJoinFormDataChange}
              >
                <option value="">선택하세요</option>
                <option value="단맛">단맛</option>
                <option value="짠맛">짠맛</option>
                <option value="매운맛">매운맛</option>
                <option value="담백한맛">담백한맛</option>
                <option value="느끼한맛">느끼한맛</option>
                <option value="상관없음">상관없음</option>
              </select>
            </label>

            <label className="column2-input">
              새로운 음식 선호 여부:&nbsp;&nbsp;&nbsp;&nbsp;
              <select
                name="newFoodPreference"
                value={userInfo.newFoodPreference}
                onChange={handleJoinFormDataChange}
              >
                <option value="">선택하세요</option>
                <option value="매우 그렇다">매우 그렇다</option>
                <option value="그렇다">그렇다</option>
                <option value="그렇지 않다">그렇지 않다</option>
                <option value="매우 그렇지 않다">매우 그렇지 않다</option>
              </select>
            </label>

            <label className="column2-input">
              선호 음식 종류:&nbsp;&nbsp;&nbsp;&nbsp;
              <select
                name="foodTypePreference"
                value={userInfo.foodTypePreference}
                onChange={handleJoinFormDataChange}
              >
                <option value="">선택하세요</option>
                <option value="한식">한식</option>
                <option value="중식">중식</option>
                <option value="양식">양식</option>
                <option value="일식">일식</option>
                <option value="상관없음">상관없음</option>
              </select>
            </label>

            <button
              id="joinBtn"
              onClick={updateBtnHandler}
              disabled={!isFormComplete}
            >
              수정하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
