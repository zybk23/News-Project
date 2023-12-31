import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  Carousel,
  Container,
  Button,
  AddRemoveList,
  Pagination,
} from "../../components";
import "./style.scss";
import { getArticles, setSelectedArticles } from "../../store/dataSlice";
import { articlesTypes } from "../../helpers/types";
import { makeCapitalizeFirstLetter } from "../../helpers/constants";
import moment from "moment";

const NewsList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { articles, selectedCategories } = useAppSelector(
    (state) => state.dataSlice
  );

  let itemsPerPage = 8;
  const pages = [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [articlesInStorage, setArticlesInStorage] = useState(
    JSON.parse(localStorage.getItem("readList") || "[]")
  );

  useEffect(() => {
    const sourceName = localStorage.getItem("sourceName");
    dispatch(getArticles(sourceName || ""));
  }, [dispatch]);

  const handleGoBackToNewsPage = () => {
    navigate("/");
  };

  const handleSelectedArticle = (article: articlesTypes) => {
    dispatch(setSelectedArticles(article));
    navigate("/details");
  };

  for (let i = 1; i <= Math.ceil(articles.length / itemsPerPage); i++) {
    pages.push(i);
  }
  const filteredArticles = articles.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    let interval = setInterval(() => {
      const sourceName = localStorage.getItem("sourceName");
      dispatch(getArticles(sourceName || ""));
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="news-detail-container">
      <Carousel
        articlesInStorage={articlesInStorage}
        setArticlesInStorage={setArticlesInStorage}
        articles={articles}
        handleSelectedArticle={handleSelectedArticle}
      />

      <Container>
        <div className="news-item-container">
          <div className="header">
            <span className="header-title">
              {makeCapitalizeFirstLetter(selectedCategories).join(" + ")}
            </span>
            <Button text="Go to News" handleGoBack={handleGoBackToNewsPage} />
          </div>
          <div className="articles-container">
            {filteredArticles.map((article: articlesTypes | any, index) => (
              <div key={index} className="single-item-container">
                <div onClick={() => handleSelectedArticle(article)}>
                  <img src={article.urlToImage} alt="" className="item-img" />
                  <p className="title">
                    {article?.title?.length > 20
                      ? article?.title?.slice(0, 20) + "..."
                      : article?.title}
                  </p>
                </div>
                <AddRemoveList
                  hour={moment(article.publishedAt).format("hh:mm")}
                  articleSourceId={article.source.id + "-" + article.id}
                  articlesInStorage={articlesInStorage}
                  setArticlesInStorage={setArticlesInStorage}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
      {pages.length > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={pages}
        />
      )}
    </div>
  );
};

export default NewsList;
