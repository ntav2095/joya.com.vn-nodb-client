import { useTranslation } from "react-i18next";
import CardCarousel from "../../containers/CardCarousel";
import RoundedButton from "../RoundedButton";
import styles from "./SliderPortion.module.css";

function SliderPortion({ title, cards, error, to }) {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h2 className={styles.margin}>{title}</h2>

      {cards && !error && <CardCarousel cards={cards} />}

      {!error && to && (
        <div className={styles.button + " " + styles.margin}>
          {<RoundedButton to={to}>{t("buttons.seeAll")}</RoundedButton>}
        </div>
      )}

      {error && (
        <div
          className={
            styles.error +
            " " +
            styles.margin +
            " bg-secondary d-flex align-items-center justify-content-center"
          }
        >
          <p className="text-light">Error: {error}</p>
        </div>
      )}
    </div>
  );
}

export default SliderPortion;
