import "./Header.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Gnb from "./Gnb";
const Header = () => {
  const nav = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const publicPage = ["/", "/login", "/*"];
    const token = localStorage.getItem("access");

    // token이 있으면 로그인 상태로 전환
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    // 로그인해야 되는 페이지 이거나, 토큰이 없을경우 로그인 페이지로 이동
    if (!publicPage.includes(location.pathname) && !token) {
      alert("로그인 페이지로 이동합니다.");
      nav("/login");
      return;
    }

    // 로그인페이지이고 토큰이 있는경우
    if (isLogin && token) {
      // 추후에 이전페이지로 이동하는 기능 수정 예정
      nav("/");
    }
  }, [location, nav]);

  return (
    <header className="header_wrap">
      <div className="header_box">
        <h1 className="header_logo"></h1>
        <Gnb />
        {/* <ul className="header_nav_box">
          <li className="header_nav_item">메뉴1</li>
          <li className="header_nav_item">메뉴2</li>
          <li className="header_nav_item">메뉴3</li>
        </ul> */}
        <div className="header_login_box">
          {!isLogin ? (
            <>
              <p className="header_login_item">로그인</p>
              <p className="header_login_item">회원가입</p>
            </>
          ) : (
            <>
              <p className="header_login_item">로그아웃</p>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
