// 로그인 페이지
// 아이디  name: id  value: id
// 비밀번호  name: password  value: password

import "../../CSS/Login.css";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true); // 로그인 버튼 활성화 여부를 설정해주기 위한 변수

  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  // 아이디와 비밀번호 값이 모두 존재할 경우에만 로그인 버튼 활성화
  useEffect(() => {
    if (id && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [id, password]);

  // Login 버튼 누르면 실행되는 함수
  const loginBtnHandler = (event) => {
    event.preventDefault();
    // 서버에 id, password 전송
    // 회원인지 아닌지 판단
    // 서버로부터 토큰 받아옴
    axios
      .post("http://localhost:8000/user/login", {
        id: id,
        pw: password,
      })
      .then(function (response) {
        console.log(response);
        // 로그인 성공 시, 서버로부터 받은 토큰을 sessionStorage에 저장
        // 로그인 성공했을 경우 홈 화면으로 이동
        if (response.status === 200) {
          sessionStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          alert("아이디와 비밀번호가 올바르지 않습니다!");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("오류가 발생했습니다.");
      });
  };

  return (
    <div className="login">
      <div id="login-box" className="slide-in-fwd-center">
        <h1 id="welcomeMsg">Welcome to MomeokJo 🤤</h1>
        <form>
          <div className="id">
            <input
              type="text"
              name="id"
              value={id}
              onChange={onIdHandler}
              placeholder="아이디를 입력해주세요"
              className="login-input"
            ></input>
          </div>
          <div className="password">
            <input
              type="password"
              name="password"
              value={password}
              onChange={onPasswordHandler}
              placeholder="비밀번호를 입력해주세요"
              className="login-input"
            ></input>
          </div>
          <div style={{ fontSize: "11px" }}>
            아직 회원이 아니신가요?{" "}
            <Link
              to={"/join"}
              style={{ textDecorationLine: "none", color: "#3081D0" }}
            >
              &nbsp;회원가입 하러가기
            </Link>
          </div>
          <button
            onClick={loginBtnHandler}
            className="loginBtn"
            disabled={disabled}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
