import React from "react";
import { useTranslation } from "react-i18next";
import {
  check,
  victoryFingers,
  holdingHands,
} from "../../../assets/images/index";
import styles from "./header.module.css";

function HomeHeader() {
  const { t } = useTranslation();

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.about}>
          <div className="col-12 col-md-4 col-lg-4">
            <img src={check} alt="check" />
            <h6>{t("homePage.intro.highClassService.title")}</h6>
            <p>{t("homePage.intro.highClassService.content")}</p>
          </div>
          <div className="col-12 col-md-4 col-lg-4">
            <img src={victoryFingers} alt="vicotry" />
            <h6>{t("homePage.intro.impressiveJourney.title")}</h6>
            <p>{t("homePage.intro.impressiveJourney.content")}</p>
          </div>
          <div className="col-12 col-md-4 col-lg-4">
            <img src={holdingHands} alt="holding hands" />
            <h6>{t("homePage.intro.trustedPartner.title")}</h6>
            <p>{t("homePage.intro.trustedPartner.content")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomeHeader;
