import "./Login.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const nav = useNavigate();
  const idRef = useRef();
  const pwRef = useRef();

  const [state, setState] = useState({
    userid: "",
    password: "",
  });

  const { userid, password } = state;

  const stateHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * 로그인 기능
   * @returns
   */
  const loginHandler = () => {
    try {
      if (!validationForm()) {
        return;
      }

      const formData = new FormData();
      formData.append("userid", state.userid);
      formData.append("password", state.password);

      axios
        .post("/api/login", formData)
        .then((res) => {
          // 만약 api 통신 실패했을시
          if (res.status !== 200) {
            alert("API 통신에 실패 하였습니다.");
            return;
          }

          const accessToken = res.headers.access;

          // // localStorage에 JWT 토큰 저장
          localStorage.setItem("access", accessToken);

          if (localStorage.getItem("access")) {
            nav("/");
          } else {
            nav("/login");
          }
        })
        .catch((error) => {
          alert("로그인 정보가 일치하지 않습니다. 다시 시도해 주세요.");
        });
    } catch (error) {
      alert("통신중 오류가 발생하였습니다. 잠시후 시도해주세요.");
    }
  };

  /**
   * form 입력값 유효성 체크
   * @returns
   */
  const validationForm = () => {
    if (!userid.trim()) {
      alert("아이디를 입력해주세요.");
      idRef.current.focus();
      return false;
    }

    if (!password.trim()) {
      alert("비밀번호를 입력해주세요.");
      pwRef.current.focus();
      return false;
    }

    return true;
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
              ref={idRef}
            />
            <input
              type="password"
              name="password"
              id="password"
              className="input"
              placeholder="비밀번호"
              value={state.password}
              onChange={stateHandler}
              ref={pwRef}
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
