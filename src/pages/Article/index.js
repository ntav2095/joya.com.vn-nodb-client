// main
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";

// components
import ErrorPage from "../../containers/ErrorPage";
import LLink from "../../components/LLink";
import NotFound from "../../pages/NotFound";

import ArticleContentPlaceholder from "./ArticleContentPlaceholder";

// other
import usePageTitle from "../../hooks/usePageTitle";
import { fetchSingleArtile } from "../../services/apis";
import useAxios from "../../hooks/useAxios";
import QuillReader from "../../components/QuillReader";

// css
import styles from "./Article.module.css";

import useScroll from "../../hooks/useScroll";

function Article() {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const { slug } = useParams();
  const { guides, status, error } = useSelector((state) => state.guides);
  console.log(guides);
  const guide = guides.find((item) => item.slug === slug);
  useScroll();

  if (!guide) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }

  const isLoading = status === "idle" || status === "pending";

  let title = guide?.title || "";
  usePageTitle(`${title + " || "}Joya Travel`);

  if (error) {
    return <ErrorPage code={error.httpCode} message={error.message} />;
  }

  if (!guide && status === "succeeded") {
    // const errorMessage =
    //   lang === "en" ? "Guide Not Found" : "Không tìm thấy bài viết";
    // return <ErrorPage code="404" message={errorMessage} />;
    return <NotFound />;
  }

  if (error) {
    return <ErrorPage code={error.httpCode} message={error.message} />;
  }

  return (
    <div className="container-md mx-auto py-5">
      <div className="row">
        <div className="col-12 col-lg-10 mx-auto">
          {/* ==================== title ========================  */}
          <h1 className="mb-4 pb-1 text-dark fw-bold text-center">
            {guide && !isLoading && guide.title}
            {isLoading && <span className="placeholder col-8"></span>}
          </h1>

          {/* ==================== breadcrumb ========================  */}
          <h6 className="text-dark">
            {guide && !isLoading && (
              <>
                <LLink
                  className={styles.breadCrumb + " text-dark"}
                  to="/guides"
                >
                  Guides
                </LLink>{" "}
                / {guide.category.name}
              </>
            )}

            {isLoading && <span className="placeholder col-4" />}
          </h6>

          {/* ==================== banner ========================  */}
          <div className={styles.banner}>
            <div className={styles.inner}>
              {guide && !isLoading && (
                <img src={guide.banner} alt={guide.title} />
              )}
              {isLoading && <div className="bg-secondary h-100"></div>}
            </div>
          </div>

          {/* ==================== author ========================  */}
          <div className={styles.author}>
            <div
              className={
                styles.nameLetter + " " + (isLoading && "bg-secondary")
              }
            >
              {guide && !isLoading && guide.author.slice(0, 1)}
              {isLoading && <span className="placeholder col-1 " />}
            </div>
            <div className={styles.info}>
              <p className={styles.name}>
                {guide && !isLoading && guide.author}
                {isLoading && <span className="placeholder col-4 " />}
              </p>
              <p className={styles.time}>
                {guide &&
                  !isLoading &&
                  format(new Date(guide.createdAt), "dd/MM/yyyy")}
                {isLoading && <span className="placeholder col-2" />}
              </p>
            </div>
          </div>
        </div>

        {/* ==================== content ========================  */}
        <div className="col-12 col-lg-7 mx-auto">
          <div className={styles.content}>
            {guide && !isLoading && <QuillReader delta={guide.content} />}
            {isLoading && <ArticleContentPlaceholder />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
