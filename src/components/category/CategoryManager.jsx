import "./CategoryManager.css";
import { useState, useEffect } from "react";
import { CategoryTypes } from "../../types/CategoryTypes";
import CategoryFilter from "./CategoryFilter";
import CategorySearch from "./CategorySearch";
import CategoryList from "./CategoryList";
import Pagination from "./Pagination";
import CategoryAddButton from "./CategoryAddButton";
import { useAuth } from "../auth/AuthProvider";
import apiClient from "../../utils/apiClient";
import handleApiError from "../../utils/handleApiError";

const CategoryManager = () => {
  const [filter, setFilter] = useState(CategoryTypes.ALL);
  const [categories, setCategories] = useState([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // console.log(isAuthenticated);
    categoriesList();
  }, []);

  /**
   * 카테고리 목록 조회
   */
  const categoriesList = async () => {
    const url = "/api/categories";
    const params = {
      page: "0",
      searchType: "ALL",
      searchValue: "",
    };

    try {
      const { status, data } = await apiClient.get(url, { params });

      // API 통신 실패시
      if (status !== 200) {
        alert("API 통신에 실패 하였습니다.");
        return false;
      }

      // content 확인
      const content = data.content;
      if (!content) {
        return false;
      }

      setCategories(content);
    } catch (error) {}
  };

  return (
    <>
      <div className="category_wrap">
        <div className="row">
          <div className="category_box">
            <div className="category_top">
              <CategoryFilter />
              <CategorySearch />
            </div>
            <CategoryList categories={categories} />
            <CategoryAddButton />
            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryManager;
