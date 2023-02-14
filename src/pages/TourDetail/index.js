// main
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// components
import ContactTable from "./ContactTable";
import TourInfo from "./TourInfo";
import TourCarousel from "./TourCarousel";
import ErrorPage from "../../containers/ErrorPage";
import ErrorBoundary from "../../components/ErrorBoundary";
import Placeholder from "../../components/placeholders/Placeholder";
import Banner from "../../components/Banner";
import FacebookComment from "../../containers/facebookComment";

// apis
import useAxios from "../../hooks/useAxios";
import { fetchSingleTour } from "../../services/apis";

// other
import usePageTitle from "../../hooks/usePageTitle";

//  css
import styles from "./TourDetail.module.css";

function TourDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { tours, error, status } = useSelector((state) => state.tours);

  const tour = tours.find((tour) => tour.slug === slug);
  const tourName = tour?.name || "Tour du lịch";

  // useLazyImgs([x]);
  usePageTitle(`${tourName} | Joya Travel`);

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
    });
  }, [slug]);

  if (error) {
    return <ErrorPage code={error.httpCode} message={error.message} />;
  }

  if (!tour && status === "succeeded") {
    return (
      <ErrorPage code={404} message={t("tourDetailPage.errors.notFound")} />
    );
  }

  if (error) {
    return <ErrorPage code={error.httpCode} message={error.message} />;
  }

  // handle slider data
  // handle data
  let slider = [];
  if (tour) {
    const images = tour.itinerary.reduce(
      (acc, cur) => [...acc, ...cur.images],
      []
    );
    if (images.every((item) => !item.isSlider)) {
      slider = images;
    } else {
      slider = images.filter((item) => item.isSlider);
    }
  }

  const isLoading = status === "idle" || status === "pending";

  return (
    <>
      <ErrorBoundary>
        <Banner
          banner={{
            isLoading: isLoading,
            error,
            image: tour?.banner,
          }}
        />
      </ErrorBoundary>

      <div className={styles.tourDetail + " container-lg"}>
        {!error && (
          <div>
            <h1 className="text-uppercase my-4 fs-4 fw-bold ">
              {tour && !isLoading && tour?.name + " [" + tour?.code + "]"}
              {isLoading && <Placeholder height={30} width={"60%"} />}
            </h1>

            <div className="row ">
              <div className="col-12 col-lg-8 mb-4 px-0 px-md-1">
                <ErrorBoundary>
                  <TourCarousel slider={slider} isLoading={isLoading} />
                </ErrorBoundary>

                <div className="pt-5 ">
                  <ErrorBoundary>
                    <TourInfo tour={tour} isLoading={isLoading} />
                  </ErrorBoundary>
                </div>
              </div>

              <div className="col-12 col-lg-4 mb-4">
                <ErrorBoundary>
                  <ContactTable tour={tour} isLoading={isLoading} />
                </ErrorBoundary>
              </div>
            </div>

            <div className="pb-5 pt-5">
              {tour && (
                <FacebookComment
                  width="100%"
                  href={`https://travelling-website-funix-v1.web.app/danh-sach-tour/${slug}`}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default TourDetail;
