import { altThumbnail } from "../../assets/images";
import LLink from "../../components/LLink";
import styles from "./ArticleCard.module.css";

function ArticleCard({ thumb, title, to, category }) {
  return (
    <LLink className={styles.cartItem} to={to}>
      <div className={styles.image}>
        <div className={styles.imageInner}>
          <img
            src={thumb}
            alt={title}
            onError={(e) => (e.target.src = altThumbnail)}
          />
        </div>
      </div>
      <div className={styles.textBox}>
        <h5>{title}</h5>
        <p>{category}</p>
      </div>
    </LLink>
  );
}

export default ArticleCard;
