import Modal from "react-bootstrap/Modal";
import axios from "../../../../services/axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./BookingModal.module.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Calendar from "../../../../containers/Calendar";
import { useRef } from "react";
import { useEffect } from "react";
import { format } from "date-fns";
import NotifyModal from "../../../../components/NotifyModal";
import * as Yup from "yup";
import { bookTour } from "../../../../services/apis";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const initialValues = {
  firstname: "",
  surname: "",
  email: "",
  address: "",
  phone: "",
  gender: "",
  adult: "",
  children: "",
  date: "",
};

function BookingModal({ selectedDate, onHide, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef();
  const dateLabelRef = useRef();

  const { t } = useTranslation();

  const submitHandler = async (values) => {
    const tour = props.tour;

    try {
      setError(null);
      setIsSuccess(false);
      setIsLoading(true);
      await axios(
        bookTour({
          name: `${tour.name} [${tour.code}]`,
          type: "book-tour",
          createdAt: Date.now(),
          customer_info: {
            firstname: values.firstname,
            surname: values.surname,
            email: values.email,
            phone: values.phone,
            gender: values.gender,
            address: values.address,
            adult: values.adult,
            children: values.children,
            departureDate: values.date,
          },
        })
      );
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const genderChangeHandler = (e, setFieldValue, values) => {
    if (values.gender !== e.target.values) {
      setFieldValue("gender", e.target.value);
    }
  };

  const tooShort = t("components.form.errors.tooShort");
  const tooLong = t("components.form.errors.tooLong");
  const required = t("components.form.errors.required");

  const bookingTourSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, tooShort)
      .max(50, tooLong)
      .required(required),
    surname: Yup.string().min(2, tooShort).max(50, tooLong).required(required),
    email: Yup.string()
      .email(t("components.form.errors.invalidEmail"))
      .required(required),
    address: Yup.string().required(required),
    phone: Yup.string()
      .matches(phoneRegExp, t("components.form.errors.invalidPhone"))
      .required(required),
    gender: Yup.string().required(required),
    adult: Yup.number().min(1).required(required),
    date: Yup.string().required(required),
  });

  useEffect(() => {
    if (showCalendar) {
      const handler = (e) => {
        if (
          !calendarRef.current.contains(e.target) &&
          !dateLabelRef.current.contains(e.target)
        ) {
          setShowCalendar(false);
        }
      };

      window.addEventListener("click", handler);

      return () => window.removeEventListener("click", handler);
    }
  }, [showCalendar]);

  useEffect(() => {
    if (isSuccess) {
      onHide();
    }
  }, [isSuccess]);

  let notify = {};
  if (isSuccess) {
    notify = {
      type: "success",
      message: t("components.form.success.bookSuccess"),
      btn: {
        component: "button",
        cb: () => {
          onHide();
          setIsSuccess(false);
          setError(null);
        },
      },
      show: isSuccess,
    };
  }

  return (
    <>
      <NotifyModal {...notify} />

      <Modal
        {...props}
        onHide={() => {
          onHide();
          setIsSuccess(false);
          setError(null);
        }}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="fs-5">
              {props.tour.name} [{props.tour.code}]
            </h4>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className={styles.form}>
            {isLoading && (
              <div className={styles.spinner}>
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}

            <Formik
              initialValues={{
                ...initialValues,
                date: selectedDate || "",
              }}
              validationSchema={bookingTourSchema}
              onSubmit={submitHandler}
            >
              {({ setFieldValue, values }) => (
                <Form>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className={styles.label}>
                        <h6>{t("components.form.firstname")}:</h6>
                        <Field type="text" name="firstname" />
                        <ErrorMessage name="firstname" component="h5" />
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className={styles.label}>
                        <h6>{t("components.form.surname")}:</h6>
                        <Field type="text" name="surname" />
                        <ErrorMessage name="surname" component="h5" />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className={styles.label}>
                        <h6>Email:</h6>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" component="h5" />
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className={styles.label}>
                        <h6>{t("components.form.phoneNumber")}:</h6>
                        <Field type="tel" name="phone" />
                        <ErrorMessage name="phone" component="h5" />
                      </div>
                    </div>
                  </div>

                  <div className={styles.gendersGroup + " " + styles.label}>
                    <h6>{t("components.form.gender")}:</h6>
                    <div className="row">
                      <div className="col-4 ">
                        <label
                          className={
                            styles.label +
                            " d-flex align-items-center border justify-content-center mb-0"
                          }
                        >
                          <p className="m-0">{t("components.form.male")}</p>
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={values.gender === "male"}
                            onChange={(e) =>
                              genderChangeHandler(e, setFieldValue, values)
                            }
                          />
                        </label>
                      </div>

                      <div className="col-4 ">
                        <label
                          className={
                            styles.label +
                            " d-flex align-items-center border justify-content-center mb-0"
                          }
                        >
                          <p className="m-0">{t("components.form.female")}</p>
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={values.gender === "female"}
                            onChange={(e) =>
                              genderChangeHandler(e, setFieldValue, values)
                            }
                          />
                        </label>
                      </div>

                      <div className="col-4 ">
                        <label
                          className={
                            styles.label +
                            " d-flex align-items-center border justify-content-center mb-0"
                          }
                        >
                          <p className="m-0">{t("components.form.other")}</p>
                          <input
                            type="radio"
                            name="gender"
                            value="other"
                            checked={values.gender === "other"}
                            onChange={(e) =>
                              genderChangeHandler(e, setFieldValue, values)
                            }
                          />
                        </label>
                      </div>
                    </div>
                    <ErrorMessage name="gender" component="h5" />
                  </div>

                  <div className={styles.label}>
                    <h6>{t("components.form.address")}:</h6>
                    <Field type="text" name="address" />
                    <ErrorMessage name="address" component="h5" />
                  </div>

                  <div className="row">
                    <div
                      className={
                        styles.dateField + " col-6 col-sm-4 " + styles.label
                      }
                    >
                      <h6>{t("components.form.departureDate")}:</h6>

                      <input
                        ref={dateLabelRef}
                        onClick={(e) => {
                          e.preventDefault();
                          setShowCalendar((prev) => !prev);
                        }}
                        type="text"
                        readOnly
                        onFocus={(e) => e.preventDefault()}
                        placeholder={
                          values.date
                            ? format(values.date, "dd/MM/yyyy")
                            : "Select date"
                        }
                      />

                      {showCalendar && (
                        <div ref={calendarRef} className={styles.calendar}>
                          <Calendar
                            availableDates={props.tour.departure_dates.map(
                              (item) => new Date(item)
                            )}
                            onSelect={(selectedDate) => {
                              setFieldValue("date", selectedDate);
                              setShowCalendar(false);
                            }}
                          />
                        </div>
                      )}
                      <ErrorMessage name="date" component="h5" />
                    </div>

                    <div className="col-6 col-sm-4">
                      <div className={styles.label}>
                        <h6>{t("components.form.adults")}:</h6>
                        <Field type="number" name="adult" />
                        <ErrorMessage name="adult" component="h5" />
                      </div>
                    </div>

                    <div className="col-6 col-sm-4">
                      <div className={styles.label}>
                        <h6>{t("components.form.children")}:</h6>
                        <Field type="number" name="children" />
                        <ErrorMessage name="children" component="h5" />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <p className={styles.errorMessage + " mb-1 text-danger"}>
                      {t("components.form.errors.bookFailed")}
                    </p>
                  )}
                  <button className="btn btn-dark btn-sm" type="submit">
                    {t("components.form.bookNow")}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BookingModal;
