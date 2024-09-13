import "./CategoryFilter.css";

const CategoryFilter = () => {
  return (
    <>
      <div className="category_filter_wrap">
        <button className="active">전체</button>
        <button>수입</button>
        <button>지출</button>
      </div>
    </>
  );
};

export default CategoryFilter;
