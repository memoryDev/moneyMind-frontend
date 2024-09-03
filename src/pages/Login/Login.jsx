import "./Login.css";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [state, setState] = useState({
    userid: "",
    password: "",
  });

  const stateHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const loginHandler = () => {
    try {
      const formData = new FormData();
      formData.append("username", state.userid);
      formData.append("password", state.password);

      axios
        .post("http://localhost:9000/login", formData)
        .then((res) => {
          // 만약 api 통신 실패했을시
          if (res.status !== 200) {
            alert("API 통신에 실패 하였습니다.");
            return;
          }

          const token = res.headers.authorization.replace("Bearer ", "");
          console.log("token : " + token);

          // localStorage에 JWT 토큰 저장
          localStorage.setItem("token", token);
        })
        .catch((error) => {
          console.log("===== error =====");
          console.log(error);
        });
    } catch (error) {
      console.error("login failed", error);
    }
  };

  return (
    <>
      <div className="login_wrap">
        <div className="login">
          <h3 className="login_logo"></h3>
          <div className="login_input_box">
            <input
              type="text"
              name="userid"
              id="userid"
              className="input"
              placeholder="아이디"
              value={state.userid}
              onChange={stateHandler}
            />
            <input
              type="password"
              name="password"
              id="password"
              className="input"
              placeholder="비밀번호"
              value={state.password}
              onChange={stateHandler}
            />
          </div>
          <div className="login_btn_wrap">
            <button className="active" onClick={loginHandler}>
              로그인
            </button>
            <button>회원가입</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
