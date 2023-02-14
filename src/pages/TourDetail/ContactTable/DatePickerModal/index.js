import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import Calendar from "../../../../containers/Calendar";
import styles from "./DatePickerModal.module.css";

function DatePickerModal({ setSelectedDate, setModalShow, tour, ...props }) {
  console.log(tour);
  const { t } = useTranslation();
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className={styles.container + " p-2"}>
        <button className={styles.closeBtn} onClick={props.onHide}>
          x
        </button>
        <h6 className="text-center pt-1">
          {t("components.calendar.pickDepartureDate")}
        </h6>
        <Calendar
          availableDates={tour.departure_dates
            .map((item) => new Date(item))
            .filter((d) => {
              return d.getTime() >= Date.now();
            })}
          onSelect={(d) => {
            setSelectedDate(d);
            setModalShow("book");
          }}
        />
      </div>
    </Modal>
  );
}

export default DatePickerModal;
