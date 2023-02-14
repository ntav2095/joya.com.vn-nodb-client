// main
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// components
import Banner from "../../components/Banner";
import HomeHeader from "./HomeHeader";
import Container from "../../components/Container";
import HomeRow from "./HomeRow";
import ErrorBoundary from "../../components/ErrorBoundary";

// other
import usePageTitle from "../../hooks/usePageTitle";

// css
import styles from "./Home.module.css";

function Home() {
  const { t } = useTranslation();

  // tours
  const {
    tours,
    status: toursStatus,
    error: toursError,
  } = useSelector((state) => state.tours);
  const hotVnTours = tours
    .filter((tour) => tour.hot && tour.is_vn_tour)
    .slice(0, 6);
  const hotEuTours = tours
    .filter((tour) => tour.hot && tour.is_eu_tour)
    .slice(0, 6);

  // guides
  const {
    guides,
    status: guidesStatus,
    error: guidesError,
  } = useSelector((state) => state.guides);
  const hotGuides = guides.slice(0, 6);

  // slider
  const homeSliders = tours.filter((tour) => tour.is_home_slider);

  usePageTitle(t("pageTitles.home"));

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  return (
    <>
      <ErrorBoundary>
        <Banner
          carousel={{
            items: homeSliders,
            isLoading: toursStatus === "idle" || toursStatus === "pending",
            error: toursError,
            type: "tour",
          }}
        />
      </ErrorBoundary>

      <Container>
        <div className={styles.welcome}>
          <ErrorBoundary>
            <HomeHeader />
          </ErrorBoundary>
        </div>

        <ErrorBoundary>
          <HomeRow
            title={t("homePage.products.euTours")}
            rowData={{
              data: hotEuTours,
              status: toursStatus,
              error: toursError,
            }}
            type="tour"
            to="/du-lich-chau-au"
          />
        </ErrorBoundary>

        <ErrorBoundary>
          <HomeRow
            title={t("homePage.products.vnTours")}
            rowData={{
              data: hotVnTours,
              status: toursStatus,
              error: toursError,
            }}
            type="tour"
            to="/du-lich-trong-nuoc"
          />
        </ErrorBoundary>

        <ErrorBoundary>
          <HomeRow
            title={t("homePage.products.guides")}
            rowData={{
              data: hotGuides,
              status: guidesStatus,
              error: guidesError,
            }}
            type="article"
            to="/guides"
          />
        </ErrorBoundary>
      </Container>
    </>
  );
}
export default Home;
