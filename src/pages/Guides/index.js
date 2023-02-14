// main
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// components
import Banner from "../../components/Banner";
import Container from "../../components/Container";
import GuidesRow from "./GuidesRow";
import SliderPortion from "../../components/SliderPortion";
import CardPlaceholder from "../../components/placeholders/CardPlaceholder";
import ErrorPage from "../../containers/ErrorPage";

// other
import usePageTitle from "../../hooks/usePageTitle";
import useScroll from "../../hooks/useScroll";

function Guides() {
  const { t } = useTranslation();

  const { guides, category, status, error } = useSelector(
    (state) => state.guides
  );
  const isLoading = status === "idle" || status === "pending";

  const placeholders = new Array(6).fill(1).map((_, index) => ({
    card: <CardPlaceholder key={index} type="article" />,
    id: index,
  }));

  const rowPlaceholder = (
    <SliderPortion
      title={
        <span className="placeholder bg-secondary col-4 col-sm-3 col-md-2 p-3 rounded" />
      }
      error={null}
      cards={placeholders}
    />
  );

  useScroll();
  usePageTitle(t("pageTitles.guides.guides"));

  if (error) return <ErrorPage code={error.httpCode} message={error.message} />;

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

      <Container>
        <div className="pt-5">
          {category.map((item) => (
            <GuidesRow key={item.slug} category={item} />
          ))}

          {isLoading && (
            <>
              {rowPlaceholder}
              {rowPlaceholder}
              {rowPlaceholder}
              {rowPlaceholder}
            </>
          )}
        </div>
      </Container>
    </>
  );
}

export default Guides;
