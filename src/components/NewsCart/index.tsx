import { useNavigate } from "react-router-dom";
import "./style.scss";
import { sourcesTypes } from "../../helpers/types";
import { getArticles } from "../../store/dataSlice";
import { useAppDispatch } from "../../store/hooks";

const NewsCart = ({ sources }: { sources: sourcesTypes[] }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleOpenNewsDetail = (name: string) => {
    dispatch(getArticles(name)).then((res: any) => {
      if (res.payload.length > 0) {
        navigate("/list");
        localStorage.setItem("sourceName", name);
      } else {
        alert("There is no articles for selected news");
      }
    });
  };
  return (
    <div className="news-item-container">
      {sources.map((source) => (
        <div
          key={source.id}
          className="cart-container"
          onClick={() => handleOpenNewsDetail(source.name)}
        >
          <span className="title">{source.name}</span>
          <div className="description-area">
            <span>{source.description}</span>
            <img src={require("../../assets/images/next.png")} alt="" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsCart;
