import "./CategoryList.css";

const CategoryList = () => {
  // 임시 데이터 함수
  const test = () => {
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
        {test()}
        {test()}
        {test()}
        {test()}
        {test()}
        {test()}
        {test()}
        {test()}
        {test()}
        {test()}
      </div>
    </>
  );
};

export default CategoryList;
