// main
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

// components
import NotifyModal from "../../../../components/NotifyModal";

// other
import { callMe } from "../../../../services/apis";
import styles from "./ContactModal.module.css";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const initialValues = {
  firstname: "",
  surname: "",
  phone: "",
  gender: "",
};

function ContactModal({ onHide, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useTranslation();
  const tourId = useParams().tourId;

  const submitHandler = async (values) => {
    try {
      setIsLoading(true);
      setError(null);
      setIsSuccess(false);
      await axios(
        callMe({
          firstname: values.firstname,
          surname: values.surname,
          phone: values.phone,
          gender: values.gender,
          tourId,
        })
      );
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const tooShort = t("components.form.errors.tooShort");
  const tooLong = t("components.form.errors.tooLong");
  const required = t("components.form.errors.required");

  const contactFormSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, tooShort)
      .max(50, tooLong)
      .required(required),
    surname: Yup.string().min(2, tooShort).max(50, tooLong).required(required),
    phone: Yup.string()
      .matches(phoneRegExp, t("components.form.errors.invalidPhone"))
      .required(required),
    gender: Yup.string().required(required),
  });

  useEffect(() => {
    if (isSuccess) {
      onHide();
    }
  }, [isSuccess]);

  let notify = {};

  if (isSuccess) {
    notify = {
      message: t("components.form.success.callMeBack"),
      type: "success",
      btn: {
        cb: () => {
          setIsSuccess(false);
          setError(null);
        },
        component: "button",
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
            <h6 className="fs-6">{t("components.form.title.callMe")}</h6>
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
              initialValues={initialValues}
              validationSchema={contactFormSchema}
              onSubmit={submitHandler}
            >
              {({ values }) => (
                <Form>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className={styles.label}>
                        <h6>{t("components.form.firstname")}:</h6>
                        <Field type="text" name="firstname" />
                        <ErrorMessage name="firstname" component="p" />
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className={styles.label}>
                        <h6>{t("components.form.surname")}:</h6>
                        <Field type="text" name="surname" />
                        <ErrorMessage name="surname" component="p" />
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className={styles.label}>
                        <h6>{t("components.form.phoneNumber")}:</h6>
                        <Field type="tel" name="phone" />
                        <ErrorMessage name="phone" component="p" />
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className={styles.label}>
                        <h6>{t("components.form.gender")}:</h6>
                        <Field
                          as="select"
                          name="gender"
                          style={{
                            color: values.gender === "" ? "gray" : "#000",
                          }}
                        >
                          <option value="" disabled defaultValue>
                            {t("components.form.pleaseChooseGender")}
                          </option>
                          <option value="male">
                            {t("components.form.male")}
                          </option>
                          <option value="female">
                            {t("components.form.female")}
                          </option>
                          <option value="other">
                            {t("components.form.other")}
                          </option>
                        </Field>
                        <ErrorMessage name="gender" component="p" />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <p className={styles.errorMessage + " mb-2 text-danger"}>
                      {t("components.form.title.callMe")}
                    </p>
                  )}
                  <button className="btn btn-dark btn-sm" type="submit">
                    {t("buttons.callMe")}
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

export default ContactModal;
