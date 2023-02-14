import styles from "./ProductsListLayout.module.css";
import Container from "../../components/Container";
import CustomPagination from "../../containers/customerPagination";
import { useTranslation } from "react-i18next";

function ProductsListLayout({
  pagination,
  title,
  onSort,
  products,
  placeholder,
  status,
  sort,
}) {
  const { pageCount, currentPage, changePageHandler } = pagination;
  const { t } = useTranslation();

  const FILTER_LIST = [
    {
      label: t("tourPages.filter.newest"),
      value: "",
    },
    {
      label: t("tourPages.filter.priceAscending"),
      value: "price-asc",
    },
    {
      label: t("tourPages.filter.priceDescending"),
      value: "price-desc",
    },
    {
      label: t("tourPages.filter.durationAscending"),
      value: "duration-asc",
    },
    {
      label: t("tourPages.filter.durationDescending"),
      value: "duration-desc",
    },
  ];

  return (
    <Container>
      <div className={styles.header}>
        <h1>{title}</h1>

        {onSort && (
          <div className={styles.filter}>
            <select onChange={onSort} value={sort}>
              {FILTER_LIST.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="row">
        {status === "succeeded" &&
          products.length > 0 &&
          products.map(({ component, id }) => (
            <div
              key={id}
              className={
                styles.product + " col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              }
            >
              {component}
            </div>
          ))}

        {status === "succeeded" && products.length === 0 && (
          <h2 className="fs-5">Không có tour nào</h2>
        )}

        {(status === "idle" || status === "pending") &&
          new Array(12).fill(1).map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              {placeholder}
            </div>
          ))}
      </div>

      {status === "succeeded" && pageCount > 0 && (
        <CustomPagination
          total={pageCount}
          pagenumber={currentPage}
          callback={changePageHandler}
        />
      )}
    </Container>
  );
}

export default ProductsListLayout;
