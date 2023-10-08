import React from "react";
import "./style.scss";
import { categoriesTypes } from "../../helpers/types";
import { setSelectedCategories } from "../../store/dataSlice";
import { useAppDispatch } from "../../store/hooks";

const Filters = ({
  categories,
  selectedCategories,
}: {
  categories: categoriesTypes[];
  selectedCategories: string[];
}) => {
  const dispatch = useAppDispatch();

  const handleSelectCategories = (name: string) => {
    dispatch(setSelectedCategories(name));
  };
  return (
    <div className="filter-container">
      <div className="title-container">
        <span className="title">News</span>
      </div>
      <div className="filter-area-container">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleSelectCategories(category.name)}
            className={`filter-item-container ${
              selectedCategories.includes(category.name) ? "selected" : ""
            }`}
          >
            <img
              src={require(`../../assets/images/${
                selectedCategories.includes(category.name) ? "check" : "add"
              }.png`)}
              alt=""
            />
            <span className="category-name">{category.name}</span>
            <span>({category.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
