// main
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// components
import ArticleCard from "../../containers/ArticleCard";
import CardPlaceholder from "../../components/placeholders/CardPlaceholder";
import Banner from "../../components/Banner";
import ProductsListLayout from "../../layout/ProductsListLayout";
import ErrorPage from "../../containers/ErrorPage";
import NotFound from "../../pages/NotFound";

// other
import usePageTitle from "../../hooks/usePageTitle";
import useScroll from "../../hooks/useScroll";

const PAGE_SIZE = 12;

function GuidesCategory() {
  const navigate = useNavigate();
  let { slug, page } = useParams();
  if (!page || isNaN(Number(page))) {
    page = 1;
  }
  let { guides, status, error, category } = useSelector(
    (state) => state.guides
  );

  const categoryItem = category.find((item) => item.slug === slug);
  const notFound = status === "succeeded" && !categoryItem;
  const isLoading = status === "idle" || status === "pending";

  usePageTitle("");
  useScroll({
    reScroll: { top: 500 },
    dependencies: [page],
  });

  if (notFound) {
    return <NotFound />;
  }

  guides = guides.filter((guide) => guide.category.slug === slug);

  const changePageHandler = (num) => {
    navigate(`/guides/${category.trim()}/${num}`);
  };

  const products = guides.map((guide) => ({
    component: (
      <ArticleCard
        thumb={guide.thumb}
        title={guide.title}
        to={`/guides/bai-viet/${guide.slug}`}
        category={guide.category.name}
      />
    ),
    id: guide.slug,
  }));

  const filteredProducts = products.slice(
    (page - 1) * PAGE_SIZE,
    (page - 1) * PAGE_SIZE + PAGE_SIZE
  );

  // không có category phù hợp (not found)

  if (error) return <ErrorPage code={error.httpCode} message={error.message} />;

  if (notFound) return <NotFound />;

  return (
    <>
      <Banner
        carousel={{
          items: guides.slice(0, 3),
          isLoading: isLoading,
          error: error,
          type: "guides",
        }}
      />

      <ProductsListLayout
        title={categoryItem?.name}
        pagination={{
          pageCount: Math.ceil(guides.length / PAGE_SIZE),
          currentPage: Number(page),
          changePageHandler: changePageHandler,
        }}
        products={filteredProducts}
        placeholder={<CardPlaceholder type="article" />}
        isLoading={isLoading}
        status={status}
      />
    </>
  );
}

export default GuidesCategory;
