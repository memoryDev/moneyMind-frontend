import { Link } from "react-router-dom";

const Gnb = () => {
  return (
    <ul className="header_nav_box">
      <li className="header_nav_item">
        <Link to="/" className="nav_item_link">
          메뉴1
        </Link>
      </li>
      <li className="header_nav_item">
        <Link to={"/"} className="nav_item_link">
          메뉴2
        </Link>
      </li>
      <li className="header_nav_item">
        <Link to={"/"} className="nav_item_link">
          메뉴3
        </Link>
      </li>
    </ul>
  );
};

export default Gnb;
