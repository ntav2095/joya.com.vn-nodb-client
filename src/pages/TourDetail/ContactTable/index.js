// main
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

// components
import BookingModal from "./BookingModal";
import Placeholder from "../../../components/placeholders/Placeholder";
import DatePickerModal from "./DatePickerModal";
import ContactModal from "./ContactModal";

// other
import { phone as phonePng } from "../../../assets/images";
import { arrowRight as arrowSvg } from "../../../assets/svgs";
import styles from "./ContactTable.module.css";

function ContactTable({ tour, isLoading }) {
  const [modalShow, setModalShow] = useState(""); // "" | "pick-date" | "book" | "contact"
  const [selectedDate, setSelectedDate] = useState(null);
  const { t } = useTranslation();
  const companyStatus = useSelector((state) => state.company.status);
  const company = useSelector((state) => state.company.company);

  const pointOfDeparture = tour ? tour.journey.split("-")[0].trim() : "";

  const isLoadingContact =
    companyStatus === "idle" || companyStatus === "pending";
  const loadedContact = companyStatus === "succeeded";

  return (
    <>
      {tour && (
        <BookingModal
          show={modalShow === "book"}
          onHide={() => setModalShow("")}
          tour={tour}
          selectedDate={selectedDate}
        />
      )}

      {tour && (
        <DatePickerModal
          show={modalShow === "pick-date"}
          onHide={() => setModalShow("")}
          tour={tour}
          setSelectedDate={setSelectedDate}
          setModalShow={setModalShow}
        />
      )}

      <ContactModal
        show={modalShow === "contact"}
        onHide={() => setModalShow("")}
      />

      <div
        className={
          styles.container +
          " d-flex d-lg-block align-items-start flex-column flex-sm-row "
        }
      >
        {tour && !isLoading && (
          <div className={styles.card + " mx-auto"}>
            <ul className={styles.tourInfo}>
              <li>
                <span>{t("general.fullPackage")}: </span>
                <strong className={styles.price}>
                  {tour.price.toLocaleString()} vnđ
                </strong>
              </li>
              <li>
                <span>{t("general.destinations")}: </span>
                <strong>{tour.destinations_text}</strong>
              </li>
              <li>
                <span>{t("general.duration")}: </span>
                <strong>
                  {tour.duration.days}{" "}
                  {tour.duration.days > 1
                    ? t("general.days")
                    : t("general.day")}{" "}
                  {tour.duration.nights}{" "}
                  {tour.duration.days > 1
                    ? t("general.nights")
                    : t("general.night")}
                </strong>
              </li>
              <li>
                <span>{t("general.departurePoint")}: </span>
                <strong>{pointOfDeparture}</strong>
              </li>
            </ul>

            <button
              className={styles.orderBtn}
              onClick={() => setModalShow("pick-date")}
            >
              {t("general.departureDates")}
              {arrowSvg}
            </button>

            <button
              className={styles.orderBtn}
              onClick={() => setModalShow("book")}
            >
              {t("buttons.bookTour")}
            </button>

            <button
              className={styles.orderBtn}
              onClick={() => setModalShow("contact")}
            >
              {t("buttons.contactUs")}
            </button>
          </div>
        )}

        {isLoading && (
          <div className={styles.card + " mx-auto p-0"}>
            <Placeholder height="300px" width="100%" />
          </div>
        )}

        {loadedContact && (
          <div
            className={
              styles.contactInfo + " row  mt-4 mt-sm-0 mt-lg-4 mx-auto"
            }
          >
            <div className="col-8 ">
              <h4 className="mb-2 fs-6 fw-bold">{t("general.contactInfo")}</h4>
              <ul>
                <li>
                  Hotline:{" "}
                  <a href={`tel:${company.hotline}`}>{company.hotline}</a>
                </li>
                <li>
                  Zalo: <a href={`tel:${company.phone}`}>{company.phone}</a>
                </li>
                <li>
                  Email: <a href={`mailto:${company.email}`}>{company.email}</a>
                </li>
              </ul>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-center ">
              <img src={phonePng} alt="phone" />
            </div>
          </div>
        )}

        {isLoadingContact && (
          <div
            className={
              styles.contactInfo + " row  mt-4 mt-sm-0 mt-lg-4 mx-auto"
            }
          >
            <div className="col-8 ">
              <h4 className="mb-2 fs-6 fw-bold">
                <Placeholder height="20px" width="150px" />
              </h4>
              <ul>
                <li>
                  <Placeholder height="18px" width="150px" />
                </li>
                <li>
                  <Placeholder height="18px" width="140px" />
                </li>
                <li>
                  <Placeholder height="18px" width="180px" />
                </li>
              </ul>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-center ">
              <Placeholder height="50px" width="50px" circle />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ContactTable;
