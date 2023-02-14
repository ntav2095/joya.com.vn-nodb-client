import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getDatesInMonth,
  isSameDate,
  DAYS,
  MONTHS,
  createDatesArr,
} from "../../services/helpers/dateHandler";
import styles from "./Calendar.module.css";

const trans = {
  sold_out: {
    en: "Sold Out",
    vi: "Đã bán hết",
  },
  available: {
    en: "Available",
    vi: "Còn hàng",
  },
};

const getRange = (datesArr) => {
  const timestamps = datesArr.map((item) => item.getTime());

  const min = Math.min(...timestamps);
  const max = Math.max(...timestamps);
  return { min: new Date(min), max: new Date(max) };
};

function Calendar({ onSelect = function () {}, availableDates = [] }) {
  const range = getRange(availableDates);
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState({
    month:
      availableDates.length > 0 ? range.min.getMonth() : new Date().getMonth(), // 0 - 11
    year:
      availableDates.length > 0
        ? range.min.getFullYear()
        : new Date().getFullYear(),
  });
  const lang = useTranslation().i18n.language;

  const isMinMonth =
    time.year === range.min.getFullYear() &&
    time.month === range.min.getMonth();
  const isMaxMonth =
    time.year === range.max.getFullYear() &&
    time.month === range.max.getMonth();

  const current_month_dates_count = getDatesInMonth(time.year, time.month);
  const prev_month_dates_count = getDatesInMonth(time.year, time.month - 1);
  const next_month_dates_count = getDatesInMonth(time.year, time.month + 1);

  const firstDays = new Date(time.year, time.month, 1).getDay();
  const lastDays = new Date(
    time.year,
    time.month,
    current_month_dates_count
  ).getDay();

  const viewed_dates = createDatesArr(prev_month_dates_count)
    .slice(prev_month_dates_count - firstDays)
    .map((item) => {
      const this_date = new Date(time.year, time.month - 1, item);
      return {
        value: this_date,
        label: item,
        is_current_month: false,
        is_selected: selectedDate && isSameDate(this_date, selectedDate),
        is_available: availableDates.find((item) =>
          isSameDate(item, this_date)
        ),
      };
    })
    .concat(
      createDatesArr(current_month_dates_count).map((item) => {
        const this_date = new Date(time.year, time.month, item);
        return {
          value: this_date,
          label: item,
          is_current_month: true,
          is_selected: selectedDate && isSameDate(this_date, selectedDate),
          is_available: availableDates.find((item) =>
            isSameDate(item, this_date)
          ),
        };
      })
    )
    .concat(
      createDatesArr(next_month_dates_count)
        .slice(0, 6 - lastDays)
        .map((item) => {
          const this_date = new Date(time.year, time.month + 1, item);
          return {
            value: this_date,
            label: item,
            is_current_month: false,
            is_selected: selectedDate && isSameDate(this_date, selectedDate),
            is_available: availableDates.find((item) =>
              isSameDate(item, this_date)
            ),
          };
        })
    );

  const paginationHandler = (step) => {
    if ((step === -1 && isMinMonth) || (step === 1 && isMaxMonth)) {
      return;
    }

    setTime((prev) => {
      const month = prev.month;
      const year = prev.year;

      if (month + step > 11) {
        return {
          year: year + 1,
          month: 0,
        };
      }

      if (month + step < 0) {
        return {
          year: year - 1,
          month: 11,
        };
      }

      return {
        year: year,
        month: month + step,
      };
    });
  };

  useEffect(() => {
    if (selectedDate) {
      onSelect(selectedDate);
    }
  }, [selectedDate]);

  const dateClasses = (is_current_month, is_selected, is_available) => {
    let classes = styles.date + " ";
    if (is_available) {
      classes += styles.available + " ";
    }

    if (!is_current_month) {
      classes += styles.notCurrentMonth + " ";
    }

    if (is_selected) {
      classes += styles.isSelected + " ";
    }

    return classes;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header + " d-flex justify-content-between pb-1"}>
        <h6 className={styles.month}>
          {MONTHS[time.month][lang]}, {time.year}
        </h6>

        <div className="d-flex align-items-center">
          <button
            title={isMinMonth ? "Không có ngày sẵn có ở tháng trước" : ""}
            className={styles.indicator + " " + (isMinMonth && styles.disabled)}
            onClick={() => paginationHandler(-1)}
          >
            &#10094;
          </button>
          <span className={styles.indicatorMiddle}>○</span>
          <button
            title={isMinMonth ? "Không có ngày sẵn có ở tháng sau" : ""}
            className={styles.indicator + " " + (isMaxMonth && styles.disabled)}
            onClick={() => paginationHandler(1)}
          >
            &#10095;
          </button>
        </div>
      </div>

      <ul className={styles.days}>
        {DAYS.map((item) => (
          <li key={item[lang]}>{item[lang]}</li>
        ))}
      </ul>

      <ul className={styles.dates}>
        {viewed_dates.map((item, index) => (
          <li
            key={index}
            // className={
            //   !item.is_current_month
            //     ? styles.notCurrentMonth
            //     : item.is_selected
            //     ? styles.selected
            //     : item.is_available
            //     ? styles.available
            //     : styles.unavailable
            // }
            className={dateClasses(
              item.is_current_month,
              item.is_selected,
              item.is_available
            )}
            onClick={() => {
              if (item.is_available) {
                setSelectedDate(item.value);
              }
            }}
          >
            <span>{item.label}</span>
          </li>
        ))}
      </ul>

      <div className={styles.notes + "  d-flex justify-content-end gap-4"}>
        <div className="d-flex gap-1 text-secondary">
          <div className={styles.availableNote}></div>
          <span>{trans.available[lang]}</span>
        </div>
        <div className="d-flex gap-1 text-secondary">
          <div className={styles.unavailableNote}></div>
          <span>{trans.sold_out[lang]}</span>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
