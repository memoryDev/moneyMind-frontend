import "./Header.css";

const Header = () => {
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
