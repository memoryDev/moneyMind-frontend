import "./Header.css";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Gnb from "./Gnb";
import { useAuth } from "./auth/AuthProvider";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const publicPage = ["/", "/*", "/login"];

    // 로그인해야 되는 페이지 이거나, 비로그인 상태일 경우
    if (!publicPage.includes(location.pathname) && !isAuthenticated) {
      alert("로그인 페이지로 이동합니다.");
      nav("/login");
      return;
    }

    // 로그인페이지이고 로그인 상태인 있는경우
    if (location.pathname === "/login" && isAuthenticated) {
      nav("/");
    }
  }, [location, nav, isAuthenticated]);

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

  return (
    <header className="header_wrap">
      <div className="header_box">
        <h1 className="header_logo"></h1>
        <Gnb />
        <div className="header_login_box">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="header_login_item">
                로그인
              </Link>
              <Link
                to="/"
                className="header_login_item"
                onClick={(e) => {
                  alert("페이지 작업중입니다.");
                  e.preventDefault();
                  return;
                }}
              >
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
