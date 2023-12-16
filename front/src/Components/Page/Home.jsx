//  홈 화면

import "../../CSS/Home.css";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // sessionStorage에서 토큰 유무 확인
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token); // 토큰 유무에 따라 로그인 상태 설정
  }, []);

  return (
    <div className="home">
      <div id="home-box">
        <div id="home-header" className="bounce-top">
          오늘.. 뭐먹죠? 🤷🏻‍♀️
        </div>
        <hr id="home-hr" />
        <div id="home-main" className="text-focus-in">
          <span style={{ fontSize: "27px" }}>
            고민하는 당신을 위한, 맞춤 음식 추천 서비스&nbsp;&nbsp;&nbsp;
          </span>
          <span style={{ fontFamily: "Patrick Hand", fontSize: "48px" }}>
            MomeokJo
          </span>
        </div>

        <div id="home-button" className="slide-in-blurred-right2">
          {/* 로그인 안한 사용자인 경우 로그인 페이지로 이동, 로그인한 사용자의
          경우 음식 추천 페이지로 이동 */}
          <Link
            to={isLoggedIn ? "/foodrecommend" : "/login"}
            id="recommend-button"
          >
            음식 추천 받으러 가기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
