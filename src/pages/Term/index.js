import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import QuillReader from "../../components/QuillReader";
import ErrorPage from "../../containers/ErrorPage";
import Placeholder from "../../components/placeholders/Placeholder";
import useAxios from "../../hooks/useAxios";
import { fetchSingleTerm } from "../../services/apis";
import styles from "./Term.module.css";

const TERM_ITEMS = new Map([
  [
    "luu-y",
    {
      code: "notes",
      title: {
        en: "Notes",
        vi: "Thông tin cần lưu ý",
      },
    },
  ],
  [
    "dieu-kien-dang-ky",
    {
      code: "registration",
      title: {
        en: "Registration policy",
        vi: "Điều kiện đăng ký",
      },
    },
  ],
  [
    "phuong-thuc-thanh-toan",
    {
      code: "payment",
      title: {
        en: "Payment methods",
        vi: "Phương thức thanh toán",
      },
    },
  ],
  [
    "chinh-sach-bao-mat",
    {
      code: "privacy",
      title: {
        en: "Privacy policies",
        vi: "Chính sách bảo mật",
      },
    },
  ],
  [
    "dieu-kien-huy-doi",
    {
      code: "cancellation",
      title: {
        en: "Cancellation policies",
        vi: "Điều kiện hủy đổi",
      },
    },
  ],
]);

function Term() {
  // luu-y | dieu-kien-dang-ky | phuong-thuc-thanh-toan | chinh-sach-bao-mat | dieu-kien-dang-ky
  const { typeOfTerm } = useParams();
  const [sendRequest, isLoading, data, error, resetStates] = useAxios();
  const lang = useTranslation().i18n.language;

  const delta = useMemo(
    () => (data ? data.data.content : [{ insert: "/n" }]),
    [data]
  );

  const termItem = TERM_ITEMS.get(typeOfTerm);
  const isCorrectCode = Boolean(termItem);

  useEffect(() => {
    if (isCorrectCode) {
      sendRequest(fetchSingleTerm(termItem.code));
    }
  }, [typeOfTerm, lang, isCorrectCode]);

  if (!isCorrectCode) {
    return <ErrorPage code={404} message={"Page Not Found"} />;
  }
  return (
    <>
      {!error && data && (
        <div className="container-lg py-5">
          <h1 className="text-center fs-3 mb-4">
            {TERM_ITEMS.get(typeOfTerm).title[lang]}
          </h1>

          <div className={styles.content + " bg-light border p-4"}>
            <QuillReader className delta={delta} />
          </div>
        </div>
      )}

      {isLoading && (
        <div className="container-lg py-5">
          <h1 className="text-center fs-3 mb-4">
            <Placeholder col={8} height="20px" />
          </h1>

          <div className={styles.content + " bg-light border p-4"}>
            <div className="mb-2">
              <Placeholder col={7} height="15px" />
              <Placeholder col={8} height="15px" />
              <Placeholder col={9} height="15px" />
            </div>
            <div className="mb-2">
              <Placeholder col={7} height="15px" />
              <Placeholder col={8} height="15px" />
              <Placeholder col={9} height="15px" />
            </div>{" "}
            <div className="mb-2">
              <Placeholder col={7} height="15px" />
              <Placeholder col={8} height="15px" />
              <Placeholder col={9} height="15px" />
            </div>{" "}
            <div className="mb-2">
              <Placeholder col={7} height="15px" />
              <Placeholder col={8} height="15px" />
              <Placeholder col={9} height="15px" />
            </div>{" "}
            <div className="mb-2">
              <Placeholder col={7} height="15px" />
              <Placeholder col={8} height="15px" />
              <Placeholder col={9} height="15px" />
            </div>
          </div>
        </div>
      )}

      {error && <ErrorPage code={error.httpCode} message={error.message} />}
    </>
  );
}

export default Term;
