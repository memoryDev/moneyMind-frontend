import "./Header.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isMainPage = location.pathname === "/";

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // // 메인페이지 일경우 로그인 체크x
    // if (isMainPage && !token) {
    //   return;
    // }
    // // 로그인페이지가 아니고 토큰이 없는경우
    // if (!isLoginPage && !token) {
    //   alert("로그인 해주세요.");
    //   nav("/login");
    //   return;
    // }
    // // 로그인 페이지이고 토큰이 있으면
    // if (isLoginPage && token) {
    //   nav("/");
    //   return;
    // }
  }, []);

  return (
    <header className="header_wrap">
      <div className="header_box">
        <h1 className="header_logo"></h1>
        <ul className="header_nav_box">
          <li className="header_nav_item">메뉴1</li>
          <li className="header_nav_item">메뉴2</li>
          <li className="header_nav_item">메뉴3</li>
        </ul>
        <div className="header_login_box">
          <p className="header_login_item">로그인</p>
          <p className="header_login_item">회원가입</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
