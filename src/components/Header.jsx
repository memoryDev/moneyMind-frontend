import "./Header.css";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Gnb from "./Gnb";
import { useAuth } from "./auth/AuthProvider";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const nav = useNavigate();

  /**
   * 로그아웃 기능
   * @returns
   */
  const logoutHandler = async () => {
    if (!confirm("로그아웃 하시겠습니까?")) {
      return;
    }

    const success = await logout();

    if (success) {
      // 로그아웃 성공했을시
      nav("/login");
    } else {
      nav("/");
    }
  };

  /**
   * 메인 페이지 이동
   */
  const moveToHomepage = () => {
    nav("/");
  };

  return (
    <header className="header_wrap">
      <div className="header_box">
        <h1 className="header_logo" onClick={moveToHomepage}></h1>
        <Gnb />
        <div className="header_login_box">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="header_login_item">
                로그인
              </Link>
              <Link to="/signup" className="header_login_item">
                회원가입
              </Link>
            </>
          ) : (
            <>
              <button className="header_login_item" onClick={logoutHandler}>
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
