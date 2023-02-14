import { placeholder } from "../../../assets/images";
import styles from "./CardPlaceholder.module.css";

function CardPlaceholder({ type }) {
  if (type === "article") {
    return (
      <div className={styles.card} aria-hidden="true">
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${placeholder})` }}
        ></div>
        <div className={styles.textBox}>
          <h5 className="card-title placeholder-glow">
            <span className="placeholder  bg-secondary col-10"></span>
          </h5>
          <p className="card-text placeholder-glow">
            <span className="placeholder bg-secondary col-8"></span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card} aria-hidden="true">
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${placeholder})` }}
      ></div>
      <div className={styles.textBox}>
        <h5 className="card-title placeholder-glow">
          <span className="placeholder  bg-secondary col-10"></span>
        </h5>
        <p className="card-text placeholder-glow">
          <span className="placeholder bg-secondary col-12"></span>
          <span className="placeholder bg-secondary col-6"></span>
          <span className="placeholder bg-secondary col-8"></span>
        </p>
      </div>
    </div>
  );
}

export default CardPlaceholder;
