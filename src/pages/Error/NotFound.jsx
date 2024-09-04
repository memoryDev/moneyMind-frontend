import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound_wrap">
      <div className="notfound_box">
        <h1>404</h1>
        <h2>페이지를 찾을수 없습니다.</h2>
        <p>죄송합니다. 더 이상 존재하지 않는 페이지입니다.</p>
        <Link to="/" className="home_btn">
          홈으로
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
