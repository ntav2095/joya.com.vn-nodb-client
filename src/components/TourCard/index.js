import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { altThumbnail, lazyImg } from "../../assets/images";
import placesMap from "../../services/constants/placesMap";
import styles from "./TourCard.module.css";
import LLink from "../../components/LLink";

function TourCard({ tour }) {
  const { to, thumb, name, price, countries, journey, duration } = tour;
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const errorHandler = (e) => {
    e.target.src = altThumbnail;
  };

  let destination = "";
  destination = tour.destinations.map((item) => item.name).join(", ");

  return (
    <div className={styles.card}>
      <LLink to={to}>
        <div className={styles.img}>
          <img src={thumb} alt={name} onError={errorHandler} />
        </div>

        <div className={styles.textBox}>
          <h5 className="text-uppercase">{name}</h5>
          <p>{destination}</p>
          <p>
            {duration.days}{" "}
            {duration.days > 1 ? t("general.days") : t("general.day")}{" "}
            {duration.nights}{" "}
            {duration.nights > 1 ? t("general.nights") : t("general.night")}
          </p>
          <p>
            {t("general.fullPackage")}:{" "}
            <strong>{price.toLocaleString()} đ</strong>
          </p>
        </div>
      </LLink>
    </div>
  );
}

export default TourCard;
