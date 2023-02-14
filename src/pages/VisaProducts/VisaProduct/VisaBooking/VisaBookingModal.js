import styles from "./VisaBooking.module.css";
import { Modal } from "react-bootstrap";
import { Form, Formik, Field, ErrorMessage } from "formik";

function VisaBookingModal({ product, guesses, date, ...other }) {
  const initialValues = {
    visaId: product._id,
    type: "visa",
    productName: product.name,
    country: product.country,
    type: product.type,

    firstname: "",
    surname: "",
    phone: "",
    email: "",
    guesses: guesses,
    date: date,
    gender: "",
    address: "",
    city: "",
  };

  return (
    <Modal {...other}>
      <Modal.Header closeButton>
        <h5>{product.name}</h5>
      </Modal.Header>
      <Modal.Body>
        <Formik initialValues={initialValues} validate={() => ({})}>
          {({ values, setFieldValue }) => (
            <Form className={styles.form + " p-2"}>
              <div className="row">
                <div className="col-6">
                  <label>
                    <h6>Họ</h6>
                    <Field name="firstname" />
                    <ErrorMessage name="firstname" component="p" />
                  </label>
                </div>

                <div className="col-6">
                  <label>
                    <h6>Tên</h6>
                    <Field name="surname" />
                    <ErrorMessage name="surname" component="p" />
                  </label>
                </div>
              </div>

              <div className="row">
                <h6 className="col-12 mb-0">Giới tính</h6>
                <div className="col-4">
                  <label className="d-flex align-items-center border rounded p-2 justify-content-center">
                    <h6 className="m-0 me-2 fw-normal">Nam</h6>
                    <input
                      type="checkbox"
                      value="male"
                      checked={values.gender === "male"}
                      onChange={(e) => {
                        if (e.target.value !== values.gender) {
                          setFieldValue("gender", e.target.value);
                        }
                      }}
                    />
                  </label>
                </div>
                <div className="col-4">
                  <label className="d-flex align-items-center border rounded p-2 justify-content-center">
                    <h6 className="m-0 me-2 fw-normal">Nữ</h6>
                    <input
                      type="checkbox"
                      value="female"
                      checked={values.gender === "female"}
                      onChange={(e) => {
                        if (e.target.value !== values.gender) {
                          setFieldValue("gender", e.target.value);
                        }
                      }}
                    />
                  </label>
                </div>
                <div className="col-4">
                  <label className="d-flex align-items-center border rounded p-2 justify-content-center">
                    <h6 className="m-0 me-2 fw-normal">Khác</h6>
                    <input
                      type="checkbox"
                      value="other"
                      checked={values.gender === "other"}
                      onChange={(e) => {
                        if (e.target.value !== values.gender) {
                          setFieldValue("gender", e.target.value);
                        }
                      }}
                    />
                  </label>
                </div>
                <ErrorMessage name="gender" component="p" />
              </div>

              <div className="row">
                <div className="col-6">
                  <label>
                    <h6>Số điện thoại</h6>
                    <Field name="phone" type="tel" />
                    <ErrorMessage name="phone" component="p" />
                  </label>
                </div>
                <div className="col-6">
                  <label>
                    <h6>Email</h6>
                    <Field name="email" type="email" />
                    <ErrorMessage name="email" component="p" />
                  </label>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <label>
                    <h6>Địa chỉ</h6>
                    <Field name="address" />
                    <ErrorMessage name="address" component="p" />
                  </label>
                </div>
                <div className="col-6">
                  <label>
                    <h6>Thành phố/Tỉnh</h6>
                    <Field name="city" />
                    <ErrorMessage name="city" component="p" />
                  </label>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <label>
                    <h6>Ngày khởi hành</h6>
                    <Field name="date" type="date" />
                    <ErrorMessage name="date" component="p" />
                  </label>
                </div>
                <div className="col-6">
                  <label>
                    <h6>Số khách</h6>
                    <Field name="guesses" type="number" />
                    <ErrorMessage name="guesses" component="p" />
                  </label>
                </div>
              </div>

              <h5>
                Tổng tiền: {(product.price * values.guesses).toLocaleString()}{" "}
                VND
              </h5>

              <button className="btn btn-primary">Đăng ký</button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default VisaBookingModal;
