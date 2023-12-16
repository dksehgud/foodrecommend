import "./App.css";

import { Link, Route, Routes, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import AboutUs from "./Components/Page/AboutUs";
import EditPersonalInfo from "./Components/Page/EditPersonalInfo";
import FoodRecommend from "./Components/Page/FoodRecommend";
import Home from "./Components/Page/Home";
import Join from "./Components/Page/Join";
import Login from "./Components/Page/Login";
import MyPage from "./Components/Page/MyPage";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // sessionStorage에서 토큰 유무 확인
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token); // 토큰 유무에 따라 로그인 상태 설정
  }, []);
  // Logout 버튼 누르면 실행되는 함수 - 토큰 제거 -> 로그아웃 상태로 설정 -> 홈으로 이동
  const handleLogoutBtn = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="App">
      <header id="menu-bar">
        {isLoggedIn ? (
          <div
            id="website-title"
            style={{
              width: "830px",
              marginLeft: "50px",
              fontSize: "50px",
              fontFamily: "Patrick Hand",
            }}
            r
          >
            MomeokJo
          </div>
        ) : (
          <div id="website-title" r>
            MomeokJo
          </div>
        )}

        <nav id="nav-container">
          <Link to={"/"} className="nav-menu">
            Home
          </Link>
          <Link to={"/aboutus"} className="nav-menu">
            About Us
          </Link>
          {/* 로그인 되어있을 경우 My Page, Logout 메뉴, 로그인 안되어 있을 경우 Login, Join 메뉴로 구성 */}
          {isLoggedIn ? (
            <>
              <Link to={"/mypage"} className="nav-menu">
                My Page
              </Link>
              <button
                style={{ border: "none" }}
                onClick={handleLogoutBtn}
                className="nav-menu"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={"/login"} className="nav-menu">
                Login
              </Link>
              <Link to={"/join"} className="nav-menu">
                Join
              </Link>
            </>
          )}
        </nav>
      </header>
      <main id="mainContents-container">
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/foodrecommend" Component={FoodRecommend} />
          <Route path="/aboutus" Component={AboutUs} />
          <Route path="/login" Component={Login} />
          <Route path="/join" Component={Join} />
          <Route path="/mypage" Component={MyPage} />
          <Route path="/editpersonalinfo" Component={EditPersonalInfo} />
        </Routes>
      </main>
      <footer>
        <i>Copyright 2023. MomeokJo all rights reserved </i>
      </footer>
    </div>
  );
}

export default App;
