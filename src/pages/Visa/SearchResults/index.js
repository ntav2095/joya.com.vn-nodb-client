import styles from "./SearchResults.module.css";
import { earth } from "../../../assets/svgs";
import { searchResults } from "../mock";
import LLink from "../../../components/LLink";

function SearchResults() {
  return (
    <div className={styles.searcModal}>
      <p className={styles.title}>{earth} Dịch vụ visa</p>
      <ul>
        {searchResults.map((item) => (
          <li key={item.id}>
            <LLink to={`/dich-vu-vi-sa/1`}>
              <div className={styles.imageWrapper}>
                <div
                  style={{
                    backgroundImage: `url(${item.image})`,
                  }}
                  className={styles.image}
                ></div>
              </div>
              <span>{item.name}</span>
            </LLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
