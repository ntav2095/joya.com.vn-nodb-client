import { useTranslation } from "react-i18next";
import QuillReader from "../QuillReader";
import styles from "./Overview.module.css";

function Overview({ tour }) {
  const { t } = useTranslation();
  return (
    <div className={styles.overview}>
      <div className={styles.item}>
        <h6>• {t("tourDetailPage.tourDetail.overview.tourName")}:</h6>
        <p>
          {tour.name} [{t("tourDetailPage.tourDetail.overview.tourCode")}:{" "}
          {tour.code}]
        </p>
      </div>
      <div className={styles.item}>
        <h6>• {t("tourDetailPage.tourDetail.overview.itinerary")}:</h6>
        <p>{tour.journey}</p>
      </div>
      <div className={styles.item}>
        <h6>• {t("tourDetailPage.tourDetail.overview.duration")}:</h6>
        <p>
          {tour.duration.days}{" "}
          {tour.duration.days > 1 ? t("general.day") : t("general.days")}{" "}
          {tour.duration.nights}{" "}
          {tour.duration.nights > 1 ? t("general.nights") : t("general.night")}
        </p>
      </div>
      <div className={styles.item}>
        <h6>• {t("tourDetailPage.tourDetail.overview.fullPackage")}:</h6>
        <p>{tour.price.toLocaleString()} vnđ</p>
      </div>
      <div className={styles.item}>
        <h6>• {t("tourDetailPage.tourDetail.overview.description")}:</h6>
        <p>{tour.description}</p>
      </div>
      <div className={styles.item}>
        <h6>• {t("tourDetailPage.tourDetail.overview.highlights")}:</h6>
        <div>
          <QuillReader delta={tour.highlights} />
        </div>
      </div>
    </div>
  );
}

export default Overview;
