import "./CategoryManager.css";
import { useState } from "react";
import { CategoryTypes } from "../../types/CategoryTypes";
import CategoryFilter from "./CategoryFilter";
import CategorySearch from "./CategorySearch";
import CategoryList from "./CategoryList";
import Pagination from "./Pagination";
import CategoryAddButton from "./CategoryAddButton";

const CategoryManager = () => {
  const [filter, setFilter] = useState(CategoryTypes.ALL);

  return (
    <>
      <div className="category_wrap">
        <div className="row">
          <div className="category_box">
            <div className="category_top">
              <CategoryFilter />
              <CategorySearch />
            </div>
            <CategoryList />
            <CategoryAddButton />
            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryManager;
