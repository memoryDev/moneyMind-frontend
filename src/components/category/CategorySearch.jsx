import "./CategorySearch.css";

const CategorySearch = () => {
  return (
    <>
      <div className="category_search_warp">
        <select name="" id="">
          <option value="">전체</option>
        </select>
        <input type="text" className="search_input" />
        <button>검색</button>
      </div>
    </>
  );
};

export default CategorySearch;
