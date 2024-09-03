import "./Login.css";

const Login = () => {
  return (
    <>
      <div className="login_wrap">
        <div className="login">
          <h3 className="login_logo"></h3>
          <div className="login_input_box">
            <input
              type="text"
              id="login_id"
              className="input"
              placeholder="아이디"
            />
            <input
              type="password"
              id="login_pw"
              className="input"
              placeholder="비밀번호"
            />
          </div>
          <div className="login_btn_wrap">
            <button className="active">로그인</button>
            <button>회원가입</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
