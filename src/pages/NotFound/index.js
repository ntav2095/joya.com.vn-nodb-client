import usePageTitle from "../../hooks/usePageTitle";
import styles from "./NotFound.module.css";
import LLink from "../../components/LLink";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const goBackHandler = () => {
    navigate(-1);
  };

  usePageTitle(t("notFoundPage.title"));
  return (
    <div className={styles.notFound}>
      <div className={styles.box}>
        <h1 className={styles.number}>
          4<span>0</span>4
        </h1>
        <h2 className={styles.text}>
          <span>{t("notFoundPage.messagePart1")}</span>{" "}
          <span>{t("notFoundPage.messagePart2")}</span>
        </h2>

        <div className={styles.buttons}>
          <LLink to="/">{t("notFoundPage.goHomeButton")}</LLink>
          <button onClick={goBackHandler}>
            {t("notFoundPage.goBackButton")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
