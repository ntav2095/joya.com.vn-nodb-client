import React, { useRef, useState } from "react";

import axios from "axios";
import styles from "./VisaBooking.module.css";
import { Modal } from "react-bootstrap";
import VisaBookingModal from "./VisaBookingModal";

function VisaBooking({ product }) {
  let [guesses, setGuesses] = useState(1);
  const [date, setDate] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);

  const handleChangeInput = (e) => {
    setDate(e.target.value);
  };

  const formatter = new Intl.NumberFormat("en-US", {
    currency: "VND",
    minimumFractionDigits: 0,
  });

  const guessesQtyHandler = (num) => {
    if (guesses === 1 && num === -1) return;
    setGuesses((prev) => prev + num);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await axios
      .post("https://sheetdb.io/api/v1/4zwi51ze52sbh", {
        data: {
          ngaydangki: new Date(),
          ngaynhapcanh: date,
          soluongkhach: guesses,
          tongtien: 6032000 * guesses,
        },
      })
      .then((e) => e.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  };

  return (
    <>
      <VisaBookingModal
        product={product}
        show={isShowModal}
        guesses={guesses}
        date={date}
        onHide={() => setIsShowModal(false)}
      />

      <div className="row border rounded py-2">
        <div className="col-3 d-flex justify-content-start align-items-center">
          <div>
            <label className="text-center w-100 fw-bold fs-6 mb-2">
              Chọn ngày nhập cảnh
            </label>

            <div className="d-flex justify-content-center">
              <input
                className={styles.datePicker}
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
            </div>
          </div>
        </div>

        <div className="col-3 d-flex justify-content-center align-items-center">
          <div>
            <label className="text-center w-100 fw-bold fs-6 mb-2">
              Áp dụng cho
            </label>
            <p className="d-flex align-items-center justify-content-center">
              <button
                onClick={() => guessesQtyHandler(-1)}
                className={
                  styles.plusBtn + (guesses === 1 ? " opacity-25 pe-none" : "")
                }
              >
                -
              </button>

              <span>{guesses} khách</span>

              <button
                onClick={() => guessesQtyHandler(1)}
                className={styles.plusBtn}
              >
                +
              </button>
            </p>
          </div>
        </div>

        <div className="col-3 d-flex justify-content-center align-items-center">
          <div>
            <label className="text-center w-100 fw-bold fs-6 mb-2">
              Tổng tiền
            </label>
            <p className="text-center fw-bold fs-6">
              <span className="price">
                {formatter.format(product.price * guesses)}
              </span>{" "}
              VND/
              <span className="count">{guesses}</span> khách
            </p>
          </div>
        </div>

        <div className="col-3 d-flex align-items-center justify-content-end">
          <button
            className={styles.bookBtn}
            onClick={() => setIsShowModal(true)}
          >
            Đặt Ngay
          </button>
        </div>
      </div>
    </>
  );
}

export default VisaBooking;
