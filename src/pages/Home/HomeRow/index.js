import { useTranslation } from "react-i18next";
import SliderPortion from "../../../components/SliderPortion";
import PlaceholderCard from "../../../components/placeholders/CardPlaceholder";
import ArticleCard from "../../../containers/ArticleCard";
import TourCard from "../../../components/TourCard";

function HomeRow({ title, rowData, type, to }) {
  const { status, data, error } = rowData;

  // handle products
  let products = []; // [ { card: <TourCard /> | <ArticleCard /> | <PlaceholderCard />, id: uid } ]

  // đang loading thì products là list PlaceholderCard
  // tùy vào type mà PlaceholderCard sẽ render ra placeholder cho tour hay guide
  if (status === "idle" || status === "pending") {
    products = new Array(6).fill(1).map((_, index) => ({
      card: <PlaceholderCard type={type} />,
      id: index,
    }));
  }

  // load xong rồi thì products là list Tour hoăc Guide Card
  if (status === "succeeded") {
    if (type === "article") {
      products = data?.map((article) => ({
        card: (
          <ArticleCard
            title={article.title}
            thumb={article.thumb}
            to={`/guides/bai-viet/${article.slug}`}
            category={article.category.name}
          />
        ),
        id: article.slug,
      }));
    }

    if (type === "tour") {
      products = data?.map((tour) => ({
        card: <TourCard tour={{ ...tour, to: `/du-lich/${tour.slug}` }} />,
        id: tour.slug,
      }));
    }
  }

  // handle error
  let errorMessage = "";
  if (error) {
    errorMessage = error.httpCode
      ? error.httpCode + " - " + error.message
      : error.message;
  }

  return (
    <SliderPortion
      title={title}
      to={to} // link cho nút "xem tất cả"
      error={errorMessage}
      cards={products}
    />
  );
}

export default HomeRow;
