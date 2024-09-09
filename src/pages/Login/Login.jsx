import "./Login.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/auth/AuthProvider";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, login } = useAuth();

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
  const loginHandler = async () => {
    if (!validationForm()) {
      return;
    }

    const success = await login(state.userid, state.password);
    if (success) {
      nav("/");
    } else {
      nav("/login");
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
