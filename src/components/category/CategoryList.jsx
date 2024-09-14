import "./CategoryList.css";
import CategoryItem from "./CategoryItem";

const CategoryList = ({ categories }) => {
  // 카테고리 아이템 생성
  const createCategoryItem = () => {
    return (
      <div className="category_list_item">
        <div className="category_item chk">
          <input type="checkbox" name="" id="" />
          <label htmlFor=""></label>
        </div>
        <div className="category_item id">1</div>
        <div className="category_item icon">
          <img src="https://via.placeholder.com/50.jpg" alt="" />
        </div>
        <div className="category_item name"></div>
        <div className="category_item fixed">Y</div>
      </div>
    );
  };

  return (
    <>
      <div className="category_list_wrap">
        <div className="category_header_item">
          <div className="header_item chk">선택</div>
          <div className="header_item id">번호</div>
          <div className="header_item icon">아이콘</div>
          <div className="header_item name">이름</div>
          <div className="header_item fixed">고정여부</div>
        </div>
        {categories.map((category) => (
          <CategoryItem key={category.id} {...category}></CategoryItem>
        ))}
      </div>
    </>
  );
};

export default CategoryList;
