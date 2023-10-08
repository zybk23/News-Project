import React, { useEffect, CSSProperties, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getNews } from "../../store/dataSlice";
import { Container, Filters, NewsCart } from "../../components";
import "./stye.scss";
import { sourcesTypes } from "../../helpers/types";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#052c54",
};

const News = () => {
  const dispatch = useAppDispatch();
  const [searchField, setSearchField] = useState("");
  const { sources, categories, isSourcesLoading, selectedCategories } =
    useAppSelector((state) => state.dataSlice);
  let filteredSources = [...sources];

  if (selectedCategories.length > 0) {
    filteredSources = filteredSources.filter((x: sourcesTypes) => {
      return selectedCategories.find((k) => k === x.category);
    });
  }

  filteredSources = filteredSources.filter((item: sourcesTypes) => {
    return item?.name?.toLowerCase().indexOf(searchField.toLowerCase()) !== -1;
  });

  const handleSearchField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
  };

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);
  return (
    <div className="news-container">
      <Container>
        <>
          <Filters
            categories={categories}
            selectedCategories={selectedCategories}
          />
          <div className="search-area-container">
            <img src={require("../../assets/images/search.png")} alt="" />
            <input
              placeholder="search news"
              type="text"
              className="search-input"
              value={searchField}
              onChange={handleSearchField}
            />
          </div>
          <div className="divider" />
          <ClipLoader
            loading={isSourcesLoading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <NewsCart sources={filteredSources} />
        </>
      </Container>
    </div>
  );
};

export default News;
