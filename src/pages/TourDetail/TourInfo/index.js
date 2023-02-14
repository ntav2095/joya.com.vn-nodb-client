import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useTranslation } from "react-i18next";

import Overview from "./Overview";
import DropdownItems from "./DropdownItems";
import Itinerary from "./Itinerary";
import Rating from "./Rating";

import styles from "./TourInfo.module.css";
import "./TourInfo.override.css";

const TourInfo = ({ tour, isLoading }) => {
  const { t } = useTranslation();

  const pricePolicies = tour
    ? [
        {
          id: "includes",
          title: t("tourDetailPage.tourDetail.pricePolicy.includes"),
          content: tour.price_policies.includes,
        },
        {
          id: "excludes",
          title: t("tourDetailPage.tourDetail.pricePolicy.excludes"),
          content: tour.price_policies.excludes,
        },
        {
          id: "other",
          title: t("tourDetailPage.tourDetail.pricePolicy.childrenAndOther"),
          content: tour.price_policies.other,
        },
      ]
    : [];

  const terms = tour
    ? [
        {
          id: "registration",
          title: t("tourDetailPage.tourDetail.terms.registration"),
          content: tour.terms.registration,
        },
        {
          id: "cancellation",
          title: t("tourDetailPage.tourDetail.terms.cancellation"),
          content: tour.terms.cancellation,
        },
        {
          id: "payment",
          title: t("tourDetailPage.tourDetail.terms.paymentMethods"),
          content: tour.terms.payment,
        },
        {
          id: "notes",
          title: t("tourDetailPage.tourDetail.terms.notes"),
          content: tour.terms.notes,
        },
      ]
    : [];

  const itinerary = tour ? tour.itinerary : [];

  return (
    <div className={styles.tourInfo + " tourInfo"}>
      {isLoading && (
        <div className={styles.placeholder}>
          <div className={styles.tabs}></div>
          <div className={styles.content}></div>
        </div>
      )}

      {/* ==================================================================  */}
      <Tabs
        defaultActiveKey="overview"
        className={styles.tabs + " mb-0 border-0"}
      >
        <Tab
          eventKey="overview"
          title={t("tourDetailPage.tourDetail.overview.title").toUpperCase()}
        >
          <div className="p-3 border rounded-0">
            {tour && <Overview tour={tour} />}
          </div>
        </Tab>
        <Tab
          eventKey="itinerary"
          title={t("tourDetailPage.tourDetail.itinerary.title").toUpperCase()}
        >
          <div className="p-3 border rounded-0">
            <Itinerary data={itinerary} />
          </div>
        </Tab>
        <Tab
          eventKey="price"
          title={t("tourDetailPage.tourDetail.pricePolicy.title").toUpperCase()}
        >
          <div className="p-3 border rounded-0">
            <DropdownItems data={pricePolicies} />
          </div>
        </Tab>

        <Tab
          eventKey="terms"
          title={t("tourDetailPage.tourDetail.terms.title").toUpperCase()}
        >
          <div className="p-3 border rounded-0">
            <DropdownItems data={terms} />
          </div>
        </Tab>
        <Tab
          eventKey="rating"
          title={t("tourDetailPage.tourDetail.rating.title").toUpperCase()}
        >
          <div className="p-3 border rounded-0">
            {tour && <Rating tour={tour} />}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TourInfo;
